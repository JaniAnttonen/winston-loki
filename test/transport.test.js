/* eslint-env jest */
const { createLogger } = require('winston')
const LokiTransport = require('winston-loki')
const fixtures = require('./fixtures.json')

describe('Integration tests', function () {
  it('Winston should accept LokiTransport', function () {
    const options = {
      transports: [new LokiTransport(fixtures.options)]
    }
    const logger = createLogger(options)

    expect(logger.constructor.name).toEqual('DerivedLogger')
    expect(logger._readableState.pipesCount).toEqual(1)
  })
  it('LokiTransport should trigger the callback function', function () {
    const lokiTransport = new LokiTransport(fixtures.options)
    let callback = false
    lokiTransport.log(fixtures.logs[0], () => {
      callback = true
    })
    expect(callback).toEqual(true)
  })
  it('LokiTransport should transfer logs to the Batcher', function () {
    const lokiTransport = new LokiTransport(fixtures.options)
    lokiTransport.log(fixtures.logs[0], () => {})
    expect(lokiTransport.batcher.batch.streams.length).toEqual(1)
  })
  it('LokiTransport should map logs correctly from Winston to Grafana Loki', function () {
    const lokiTransport = new LokiTransport(fixtures.options)
    lokiTransport.log(fixtures.logs[0], () => {})
    expect(lokiTransport.batcher.batch.streams.length).toEqual(1)
    expect(lokiTransport.batcher.batch.streams[0]).toEqual(
      JSON.parse(fixtures.logs_mapped[0])
    )
  })
})
