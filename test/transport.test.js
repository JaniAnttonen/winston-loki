const { createLogger } = require('winston')
const LokiTransport = require('winston-loki')
const fixtures = require('./fixtures.json')
const sinon = require('sinon')

describe('Integration tests', function () {
  it('Winston should accept LokiTransport', function () {
    const options = {
      transports: [new LokiTransport(fixtures.options)]
    }
    const logger = createLogger(options)

    expect(logger.constructor.name).toBe('DerivedLogger')
    expect(logger._readableState.pipesCount).toBe(1)
  })
  it('LokiTransport should trigger the "logged" event', function (done) {
    const lokiTransport = new LokiTransport(fixtures.options)
    const spy = sinon.spy(eventEmitted)
    lokiTransport.on('logged', spy)
    lokiTransport.log(fixtures.logs[0], () => {})
    function eventEmitted () {
      expect(spy.called).toBe(true)
      done()
    }
  })
  it('LokiTransport should trigger the callback function', function () {
    const lokiTransport = new LokiTransport(fixtures.options)
    let callback = false
    lokiTransport.log(fixtures.logs[0], () => {
      callback = true
    })
    expect(callback).toBe(true)
  })
  it('LokiTransport should transfer logs to the Batcher', function () {
    const lokiTransport = new LokiTransport(fixtures.options)
    lokiTransport.log(fixtures.logs[0], () => {})
    expect(lokiTransport.batcher.batch.streams.length).toBe(1)
  })
  it('LokiTransport should correctly map values before sending to Batcher', function () {
    const lokiTransport = new LokiTransport(fixtures.options)
    const spy = sinon.spy(lokiTransport.batcher, 'pushLogEntry')
    lokiTransport.log(fixtures.logs[0], () => {})
    expect(spy.calledWith(JSON.parse(fixtures.logs_mapped[0]))).toBe(true)
  })
  it('LokiTransport should map logs correctly from Winston to Grafana Loki format', function () {
    const lokiTransport = new LokiTransport(fixtures.options)
    lokiTransport.log(fixtures.logs[0], () => {})
    expect(lokiTransport.batcher.batch.streams.length).toBe(1)
    expect(lokiTransport.batcher.batch.streams[0]).toEqual(
      JSON.parse(fixtures.logs_mapped[0])
    )
  })
})
