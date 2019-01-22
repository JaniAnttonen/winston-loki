const got = require('got')
const url = require('url')
const { logproto } = require('./proto')
const snappy = require('snappy')
const protoHelpers = require('./proto/helpers')

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
    this.contentType = 'application/x-protobuf'
    if (this.options.json) {
      this.contentType = 'application/json'
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
      logEntry = protoHelpers.createProtoTimestamps(logEntry)
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
        let reqBody
        if (this.options.json) {
          reqBody = JSON.stringify(this.batch)
        } else {
          const err = logproto.PushRequest.verify(this.batch)
          if (err) reject(err)
          const message = logproto.PushRequest.create(this.batch)
          const buffer = logproto.PushRequest.encode(message).finish()
          reqBody = snappy.compressSync(buffer)
        }
        got
          .post(this.url, {
            body: reqBody,
            headers: {
              'content-type': this.contentType
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
