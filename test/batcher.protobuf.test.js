const Batcher = require('../src/batcher')
const req = require('../src/requests')
const { logproto } = require('../src/proto')
const fixtures = require('./fixtures.json')

const { createProtoTimestamps, prepareProtoBatch } = require('../src/proto/helpers')

let batcher

describe('Batcher tests with Protobuf + gRPC transport', function () {
  beforeEach(async function () {
    jest.resetModules()
    batcher = new Batcher(fixtures.options_protobuf)
    req.post = await jest
      .spyOn(req, 'post')
      .mockImplementation(() => Promise.resolve())
  })
  afterEach(function () {
    batcher.clearBatch()
    req.post.mockRestore()
  })
  it('Should add same items in the same stream', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[0]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[0]))
    expect(batcher.batch.streams.length).toBe(1)
  })
  it('Should add items with same labels in the same stream', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[1]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[2]))
    expect(batcher.batch.streams.length).toBe(1)
  })
  it('Should convert the timestamps on push when batching is disabled', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_protobuf))
    options.batching = false
    batcher = new Batcher(options)

    const logEntryConverted = createProtoTimestamps(
      JSON.parse(fixtures.logs_mapped_before[1])
    )
    const stub = jest.spyOn(batcher, 'sendBatchToLoki').mockResolvedValue()

    await batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[1]))
    expect(stub).toHaveBeenCalledWith(logEntryConverted)
    stub.mockRestore()
  })
  it('Should be able to clear the batch of streams', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[0]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[2]))
    expect(batcher.batch.streams.length).toBe(2)
    batcher.clearBatch()
    expect(batcher.batch.streams.length).toBe(0)
  })
  it('Should fail if the batch is not constructed correctly', async function () {
    batcher.pushLogEntry(fixtures.incorrectly_mapped)
    try {
      await batcher.sendBatchToLoki()
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
  it("Should fail if snappy can't compress the buffer", async function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[2]))
    const snappy = require('snappy')
    const spy = jest.spyOn(snappy, 'compressSync').mockImplementation(() => { throw new Error('compression failed') })
    try {
      await batcher.sendBatchToLoki()
    } catch (error) {
      expect(error).toBeTruthy()
    }
    spy.mockRestore()
  })
  it('Should wrap single logEntry in {streams: []} if batching is disabled', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_protobuf))
    options.batching = false
    batcher = new Batcher(options)
    const responseObject = {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
    req.post.mockResolvedValue(responseObject)
    await batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[1]))

    const logEntryConverted = createProtoTimestamps(
      JSON.parse(fixtures.logs_mapped_before[1])
    )
    const preparedLogEntry = prepareProtoBatch({ streams: [logEntryConverted] })
    const buffer = logproto.PushRequest.encode(preparedLogEntry).finish()

    const snappy = require('snappy')
    const data = snappy.compressSync(buffer)
    expect(req.post.mock.calls[0][3]).toEqual(data)
  })
  it('Should construct without snappy binaries to a JSON transport', function () {
    batcher = new Batcher(fixtures.options_protobuf)
    expect(batcher.options.json).toBe(false)
    jest.spyOn(Batcher.prototype, 'loadSnappy').mockImplementation(() => false)
    batcher = new Batcher(fixtures.options_protobuf)
    expect(batcher.options.json).toBe(true)
  })
  it('Should fallback to JSON transport when snappy throws on load', function () {
    jest.resetModules()
    jest.doMock('snappy', () => { throw new Error('snappy not found') })
    const FreshBatcher = require('../src/batcher')
    batcher = new FreshBatcher(JSON.parse(JSON.stringify(fixtures.options_protobuf)))
    expect(batcher.options.json).toBe(true)
  })
  it('Should call close callback even when sendBatchToLoki rejects', async function () {
    req.post.mockRejectedValue({ statusCode: 500 })
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped_before[0]))
    await new Promise(resolve => batcher.close(resolve))
  })
  it('prepareProtoBatch should skip already-prepared entries', function () {
    const entry = { labels: '{level="info",job="test"}', entries: [] }
    const result = prepareProtoBatch({ streams: [entry] })
    expect(result.streams[0].labels).toBe('{level="info",job="test"}')
  })
  it('Should fallback to JSON when snappy require throws (isolated)', function () {
    jest.isolateModules(() => {
      jest.doMock('snappy', () => { throw new Error('no snappy') })
      const IsolatedBatcher = require('../src/batcher')
      const options = JSON.parse(JSON.stringify(fixtures.options_protobuf))
      const b = new IsolatedBatcher(options)
      expect(b.options.json).toBe(true)
      expect(b.contentType).toBe('application/json')
    })
  })
})
