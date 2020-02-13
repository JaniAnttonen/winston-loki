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
      interval: options.interval,
      json: options.json,
      batching: !options.batching,
      clearOnError: options.clearOnError,
      replaceOnError: options.replaceOnError,
      replaceTimestamp: options.replaceTimestamp,
      gracefulShutdown: !options.gracefulShutdown
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
    let lokiLabels
    if (this.labels) {
      lokiLabels = `{level="${level}"`
      for (let key in this.labels) {
        lokiLabels += `,${key}="${this.labels[key]}"`
      }
      if (labels) {
        for (let key in labels) {
          lokiLabels += `,${key}="${labels[key]}"`
        }
      }
      lokiLabels += '}'
    } else {
      lokiLabels = `{job="${label}", level="${level}"}`
    }

    // follow the format provided
    const line = this.useCustomFormat ? info[MESSAGE] : `${message} ${
      rest && Object.keys(rest).length > 0 ? JSON.stringify(rest) : ''
    }`

    // Construct the log to fit Grafana Loki's accepted format
    const logEntry = {
      labels: lokiLabels,
      entries: [
        {
          ts: timestamp || Date.now(),
          line
        }
      ]
    }

    // Pushes the log to the batcher
    this.batcher.pushLogEntry(logEntry)

    // Trigger the optional callback
    callback()
  }

  /**
   * Send batch to loki when clean up
   */
  close () {
    this.batcher.sendBatchToLoki()
      .then(() => {}) // maybe should emit something here
      .catch(() => {}) // maybe should emit something here
  }
}

module.exports = LokiTransport
