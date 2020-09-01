const { createLogger } = require('winston')
const LokiTransport = require('winston-loki')
const fixtures = require('./fixtures.json')

describe('Integration tests', function () {
  it('Winston should accept LokiTransport', function () {
    const options = {
      transports: [new LokiTransport(fixtures.options_json)]
    }
    const logger = createLogger(options)

    expect(logger.constructor.name).toBe('DerivedLogger')
    expect(logger._readableState.pipesCount).toBe(1)
  })
  it('LokiTransport should trigger the "logged" event', function (done) {
    const lokiTransport = new LokiTransport(fixtures.options_json)
    const spy = jest.fn(eventEmitted)
    lokiTransport.on('logged', spy)
    lokiTransport.log(fixtures.logs[0], () => {})
    function eventEmitted () {
      expect(spy).toHaveBeenCalled()
      done()
    }
  })
  it('LokiTransport should trigger the callback function', function () {
    const lokiTransport = new LokiTransport(fixtures.options_json)
    let callback = false
    lokiTransport.log(fixtures.logs[0], () => {
      callback = true
    })
    expect(callback).toBe(true)
  })
  it('LokiTransport should transfer logs to the Batcher', function () {
    const lokiTransport = new LokiTransport(fixtures.options_json)
    lokiTransport.log(fixtures.logs[0], () => {})
    expect(lokiTransport.batcher.batch.streams.length).toBe(1)
  })
  it('LokiTransport should correctly map values before sending to Batcher', function () {
    const lokiTransport = new LokiTransport(fixtures.options_json)
    const spy = jest.spyOn(lokiTransport.batcher, 'pushLogEntry')
    lokiTransport.log(fixtures.logs[0], () => {})
    expect(spy).toHaveBeenCalledWith(JSON.parse(fixtures.logs_mapped_before[0]))
  })
  it('LokiTransport should map logs correctly from Winston to Grafana Loki format', function () {
    const lokiTransport = new LokiTransport(fixtures.options_json)
    lokiTransport.log(fixtures.logs[0], () => {})
    expect(lokiTransport.batcher.batch.streams.length).toBe(1)
    expect(lokiTransport.batcher.batch.streams[0]).toEqual(
      fixtures.logs[0]
    )
  })
  it("LokiTransport should append anything else than the message after it in the log's entry", function () {
    const lokiTransport = new LokiTransport(fixtures.options_json)
    lokiTransport.log(fixtures.logs[3], () => {})
    expect(lokiTransport.batcher.batch.streams.length).toBe(1)
    expect(
      JSON.stringify(lokiTransport.batcher.batch.streams[0]).replace(/\s/g, '')
    ).toEqual(fixtures.logs_mapped_before[3].replace(/\s/g, ''))
  })
  it('LokiTransport should not append anything else after the message if there are no extra keys in the log object', function () {
    const lokiTransport = new LokiTransport(fixtures.options_json)
    lokiTransport.log(fixtures.logs[2], () => {})
    expect(lokiTransport.batcher.batch.streams.length).toBe(1)
    expect(
      JSON.stringify(lokiTransport.batcher.batch.streams[0]).replace(/\s/g, '')
    ).toEqual(fixtures.logs_mapped_before[2].replace(/\s/g, ''))
  })
})
