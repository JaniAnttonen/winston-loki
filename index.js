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
    this.labels = options.labels
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
    const { label, labels, timestamp, level, message, ...rest } = info

    // build custom labels if provided
    let lokiLabels = { level: level }

    if (this.labels) {
      lokiLabels = Object.assign(lokiLabels, this.labels)
    } else {
      lokiLabels.job = label
    }

    lokiLabels = Object.assign(lokiLabels, labels)

    // follow the format provided
    const line = this.useCustomFormat
      ? info[MESSAGE]
      : `${message} ${
      rest && Object.keys(rest).length > 0 ? JSON.stringify(rest) : ''
    }`

    // Make sure all label values are strings
    lokiLabels = Object.fromEntries(Object.entries(lokiLabels).map(([key, value]) => [key, value ? value.toString() : value]))

    // Construct the log to fit Grafana Loki's accepted format
    let ts
    if (timestamp) {
      ts = new Date(timestamp)
      ts = isNaN(ts) ? Date.now() : ts.valueOf()
    } else {
      ts = Date.now()
    }

    const logEntry = {
      labels: lokiLabels,
      entries: [
        {
          ts,
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
