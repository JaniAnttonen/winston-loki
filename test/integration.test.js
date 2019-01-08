/* eslint-env jest */
const { createLogger } = require('winston')
const LokiTransport = require('winston-loki')

describe('Integration tests', function () {
  it('Winston should accept LokiTransport', function () {
    const options = {
      transports: [
        new LokiTransport({
          host: 'http://localhost:3100'
        })
      ]
    }
    const logger = createLogger(options)

    expect(logger.constructor.name).toEqual('DerivedLogger')
    expect(logger._readableState.pipesCount).toEqual(1)
  })
})
