const Batcher = require('../src/batcher')
const LokiTransport = require('../index')
const req = require('../src/requests')
const fixtures = require('./fixtures.json')

describe('Close behaviour', function () {
  beforeEach(function () {
    jest.spyOn(req, 'post').mockImplementation(() => Promise.resolve())
  })
  afterEach(function () {
    jest.restoreAllMocks()
  })

  it('Should return the batcher close promise so shutdown code can await the final send', async function () {
    // batching: false so the constructor doesn't start a run loop that would
    // keep the jest worker alive after the test
    const transport = new LokiTransport({ host: 'http://localhost', batching: false })
    let finalSendDone = false
    jest.spyOn(transport.batcher, 'close').mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 20))
      finalSendDone = true
    })
    const result = transport.close()
    expect(result).toBeInstanceOf(Promise)
    await result
    expect(finalSendDone).toBe(true)
  })

  it('Should resolve wait immediately after the loop has been stopped', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_json))
    const batcher = new Batcher(options)
    batcher.runLoop = false
    const start = Date.now()
    await batcher.wait(2000)
    expect(Date.now() - start).toBeLessThan(1000)
  })

  it('Should resolve close promptly when it is called while a send is in flight', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_json))
    options.interval = 2
    const batcher = new Batcher(options)
    // Each send takes ~100ms so close() below lands mid-send, when waitResolve
    // is not armed yet and only the wait() guard can skip the interval sleep
    jest.spyOn(batcher, 'sendBatchToLoki').mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )
    batcher.runPromise = batcher.run()
    await new Promise(resolve => setTimeout(resolve, 30))
    const start = Date.now()
    await batcher.close()
    expect(Date.now() - start).toBeLessThan(1000)
  })
})
