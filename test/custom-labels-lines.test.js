const { createLogger, format } = require('winston')
const LokiTransport = require('winston-loki')

// from: https://jestjs.io/docs/en/expect#expectextendmatchers
expect.extend({
  toBeWithinRange (received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false
      }
    }
  }
})

describe('Integration tests', function () {
  it('Winston should accept LokiTransport', function () {
    const lokiTransport = new LokiTransport({
      host: 'http://localhost',
      level: 'debug',
      interval: 10,
      labels: {
        module: 'name',
        app: 'appname'
      },
      format: format.combine(
        format.label({ label: 'name' }),
        format.printf(({ message, label }) => {
          return `[${label}] ${message}`
        })
      )
    })

    const options = {
      transports: [lokiTransport]
    }
    const logger = createLogger(options)

    const testMessage = 'testMessage'
    const testLabel = 'testLabel'
    const now = Date.now() / 1000
    logger.debug({ message: testMessage, labels: { customLabel: testLabel } })
    expect(lokiTransport.batcher.batch.streams.length).toBe(1)
    expect(
      lokiTransport.batcher.batch.streams[0]
    ).toEqual({
      labels: { level: 'debug', module: 'name', app: 'appname', customLabel: testLabel },
      entries: [{
        line: `[name] ${testMessage}`,
        timestamp: {
          nanos: expect.any(Number),
          seconds: expect.toBeWithinRange(now - 5, now + 5)
        }
      }]
    })
  })
})
