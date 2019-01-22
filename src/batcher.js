const got = require('got')
const url = require('url')
const loadProto = require('./proto')

module.exports = class Batcher {
  constructor (options) {
    this.options = options
    this.url = new url.URL(this.options.host + '/api/prom/push').toString()
    this.interval = this.options.interval
      ? Number(this.options.interval) * 1000
      : 5000
    this.circuitBreakerInterval = 60000
    this.batch = {
      streams: []
    }
    this.protoDef = null
    if (!this.options.json) {
      this.protoDef = loadProto()
    }
  }

  wait (duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    })
  }

  pushLogEntry (logEntry) {
    if (this.options.json) {
      this.batch.streams.push(logEntry)
    } else {
      const { streams } = this.batch
      const match = streams.findIndex(
        stream => stream.labels === logEntry.labels
      )
      if (match > -1) {
        logEntry.entries.forEach(entry => {
          streams[match].entries.push(entry)
        })
      } else {
        streams.push(logEntry)
      }
    }
  }

  clearBatch () {
    this.batch.streams = []
  }

  sendBatchToLoki () {
    return new Promise((resolve, reject) => {
      if (this.batch.streams.length === 0) {
        resolve()
      } else {
        if (this.options.json) {
          got
            .post(this.url, {
              body: JSON.stringify(this.batch),
              headers: {
                'content-type': 'application/json'
              }
            })
            .then(res => {
              this.clearBatch()
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        } else {
          const PushRequest = this.protoDef.lookupType('logproto.PushRequest')
          const err = PushRequest.verify(this.batch)
          if (err) reject(err)
          const message = PushRequest.create(this.batch)
          const buffer = PushRequest.encode(message).finish()
          got
            .post(this.url, {
              body: buffer,
              headers: {
                'content-type': 'application/x-protobuf'
              }
            })
            .then(res => {
              this.clearBatch()
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        }
      }
    })
  }

  async run () {
    while (true) {
      try {
        await this.sendBatchToLoki()
        if (this.interval === this.circuitBreakerInterval) {
          this.interval = Number(this.options.interval) * 1000
        }
      } catch (e) {
        this.interval = this.circuitBreakerInterval
      }
      await this.wait(this.interval)
    }
  }
}
