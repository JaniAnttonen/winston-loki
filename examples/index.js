const winston = require('winston')
const LokiTransport = require('../index')
const logger = winston.createLogger()

logger.add(new winston.transports.Console({
  format: winston.format.json(),
  level: 'debug'
}))

logger.add(new LokiTransport({
  host: 'http://127.0.0.1:3100',
  json: true,
  batching: true,
  interval: 15,
  labels: { job: 'winston-loki-example' }
}))

const wait = (duration) => new Promise(resolve => {
  setTimeout(resolve, duration)
})

const run = async () => {
  while (true) {
    logger.debug('I am a debug log')
    logger.info('This is a test, no need to panic')
    logger.error('Testing for errors')
    await wait(1000)
  }
}

run()
