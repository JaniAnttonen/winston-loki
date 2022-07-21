const Transport = require('winston-transport')
const Batcher = require('./src/batcher')
const { MESSAGE } = require('triple-beam')

/**
 * A Winston transport for Grafana Loki.
 *
 * @class LokiTransport
 * @extends {Transport}
 */
class LokiTransport extends Transport {
  /**
   * Creates an instance of LokiTransport.
   * @param {*} options
   * @memberof LokiTransport
   */
  constructor (options) {
    super(options)

    // Pass all the given options to batcher
    this.batcher = new Batcher({
      host: options.host,
      basicAuth: options.basicAuth,
      headers: options.headers || {},
      interval: options.interval,
      json: options.json,
      batching: options.batching !== false,
      clearOnError: options.clearOnError,
      onConnectionError: options.onConnectionError,
      replaceTimestamp: options.replaceTimestamp,
      gracefulShutdown: options.gracefulShutdown !== false,
      timeout: options.timeout
    })

    this.useCustomFormat = options.format !== undefined
    this.labels = options.labels || { job: 'winston-loki' }
  }

  /**
   * An overwrite of winston-transport's log(),
   * which the Winston logging library uses
   * when pushing logs to a transport.
   *
   * @param {*} info
   * @param {*} callback
   * @memberof LokiTransport
   */
  log (info, callback) {
    // Immediately tell Winston that this transport has received the log.
    setImmediate(() => {
      this.emit('logged', info)
    })

    // Deconstruct the log
    const { timestamp } = info

    // follow the format provided
    const line = this.useCustomFormat ? info[MESSAGE] : JSON.stringify(info)

    // Make sure all label values are strings
    this.labels = Object.fromEntries(Object.entries(this.labels).map(([key, value]) => [key, value ? value.toString() : value]))

    // Construct the log to fit Grafana Loki's accepted format
    const logEntry = {
      labels: this.labels,
      entries: [
        {
          ts: timestamp || Date.now().valueOf(),
          line
        }
      ]
    }

    // Pushes the log to the batcher
    this.batcher.pushLogEntry(logEntry).catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
    })

    // Trigger the optional callback
    callback()
  }

  /**
   * Send batch to loki when clean up
   */
  close () {
    this.batcher.close()
  }
}

module.exports = LokiTransport
