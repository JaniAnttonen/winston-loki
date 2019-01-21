const got = require('got')
const grpc = require('grpc')
const { Pusher } = require('./proto')

module.exports = class Batcher {
  constructor (options) {
    this.options = options
    this.interval = this.options.interval
      ? Number(this.options.interval) * 1000
      : 5000
    this.circuitBreakerInterval = 60000
    this.batch = {
      streams: []
    }
    if (!this.options.json) {
      this.pusher = new Pusher(
        this.options.host + '/api/prom/push',
        grpc.credentials.createInsecure()
      )
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
            .post(this.options.host + '/api/prom/push', {
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
          this.pusher.push(this.batch)
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
