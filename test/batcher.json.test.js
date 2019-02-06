const Batcher = require('../src/batcher')
const got = require('got')
const fixtures = require('./fixtures.json')

const { sortBatch } = require('../src/proto/helpers')

let batcher

describe('Batcher tests with JSON transport', function () {
  beforeEach(async function () {
    batcher = new Batcher(fixtures.options_json)
    this.post = await jest.stub(got, 'post')
  })
  afterEach(function () {
    batcher.clearBatch()
    got.post.restore()
  })
  it('Should construct with default interval if one is not given', function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_json))
    delete options.interval
    batcher = new Batcher(options)
    expect(batcher.interval).toBe(5000)
  })
  it('Should not run the loop when batching is disabled', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_json))
    options.batching = false

    await jest.stub(Batcher.prototype, 'run')

    batcher = new Batcher(options)

    expect(batcher.run.called).toBe(false)
    await Batcher.prototype.run.restore()
  })
  it('Should call sendBatchToLoki instantly when batching is disabled', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_json))
    options.batching = false
    batcher = new Batcher(options)

    const stub = await jest.stub(batcher, 'sendBatchToLoki')
    await stub.returns(() => call())
    const spy = jest.spyOn(call)

    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))

    function call () {
      expect(spy.called).toBe(true)
    }
    await stub.restore()
  })
  it('Should add same items in the same stream', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    expect(batcher.batch.streams.length).toBe(1)
  })
  it('Should add items with same labels in the same stream', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
    expect(batcher.batch.streams.length).toBe(1)
  })
  it('Should add items with different labels in separate streams', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
    expect(batcher.batch.streams.length).toBe(2)
  })
  it('Should replace timestamps with Date.now() if replaceTimestamp is enabled', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))

    expect(batcher.batch.streams[0].entries[0].ts).toBe(
      fixtures.logs[1].timestamp
    )

    const options = JSON.parse(JSON.stringify(fixtures.options_json))
    options.replaceTimestamp = true
    batcher = new Batcher(options)

    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))

    expect(batcher.batch.streams[0].entries[0].ts).not.toBe(
      fixtures.logs[1].timestamp
    )
  })
  it('Should sort the batch correctly', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))
    expect(batcher.batch.streams[0].entries[0].ts).toEqual(
      fixtures.logs[2].timestamp
    )
    batcher.batch = sortBatch(batcher.batch)
    expect(batcher.batch.streams[0].entries[0].ts).toEqual(
      fixtures.logs[1].timestamp
    )
  })
  it('Should be able to clear the batch of streams', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
    expect(batcher.batch.streams.length).toBe(2)
    batcher.clearBatch()
    expect(batcher.batch.streams.length).toBe(0)
  })
  it('Should wrap single logEntry in {streams: []} if batching is disabled', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_json))
    options.batching = false
    batcher = new Batcher(options)
    const responseObject = {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
    got.post.resolves(responseObject)
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))

    expect(got.post.lastCall.lastArg.body).toBe(
      JSON.stringify({ streams: [JSON.parse(fixtures.logs_mapped[1])] })
    )
  })
  it('Should clear batch and resolve on successful send', async function () {
    const responseObject = {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
    got.post.resolves(responseObject)
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    expect(batcher.batch.streams.length).toBe(1)
    await batcher.sendBatchToLoki()
    expect(batcher.batch.streams.length).toBe(0)
  })
  it('Should reject promise and not clear batch on unsuccessful send', async function () {
    const errorObject = {
      statusCode: 404
    }
    got.post.rejects(errorObject)
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    expect(batcher.batch.streams.length).toBe(1)
    try {
      await batcher.sendBatchToLoki()
    } catch (error) {
      expect(error.statusCode).toBe(404)
    }
    expect(batcher.batch.streams.length).toBe(1)
  })
  it('Should reject promise and clear batch on unsuccessful send if clearOnError is enabled', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_json))
    options.clearOnError = true
    batcher = new Batcher(options)

    const errorObject = {
      statusCode: 404
    }
    got.post.rejects(errorObject)
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    expect(batcher.batch.streams.length).toBe(1)

    try {
      await batcher.sendBatchToLoki()
    } catch (error) {
      expect(error.statusCode).toBe(404)
    }

    expect(batcher.batch.streams.length).toBe(0)
  })
  it('Should fail if the batch is not constructed correctly', async function () {
    const responseObject = {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
    got.post.resolves(responseObject)
    batcher.pushLogEntry(fixtures.incorrectly_mapped)
    try {
      await batcher.sendBatchToLoki()
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
  it('Run loop should work correctly', async function () {
    const errorObject = {
      statusCode: 404
    }
    got.post.rejects(errorObject)

    const circuitBreakerInterval = fixtures.options_json.interval * 1000 * 1.01
    const waitFor = fixtures.options_json.interval * 1000 * 1.05

    batcher.circuitBreakerInterval = circuitBreakerInterval
    batcher.run()
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))

    expect(batcher.batch.streams.length).toBe(1)
    expect(batcher.interval).toBe(fixtures.options_json.interval * 1000)

    await batcher.wait(waitFor)

    expect(batcher.batch.streams.length).toBe(1)
    expect(batcher.interval).toBe(circuitBreakerInterval)

    const responseObject = {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
    got.post.resolves(responseObject)

    await batcher.wait(waitFor)

    expect(batcher.interval).toBe(fixtures.options_json.interval * 1000)
  })
})
