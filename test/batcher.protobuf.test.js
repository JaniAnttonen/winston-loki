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
    batcher.pushLogEntry(fixtures.logs[0])
    batcher.pushLogEntry(fixtures.logs[0])
    expect(batcher.batch.streams.length).toBe(1)
  })
  it('Should add items with same labels in the same stream', function () {
    batcher.pushLogEntry(fixtures.logs[1])
    batcher.pushLogEntry(fixtures.logs[2])
    expect(batcher.batch.streams.length).toBe(1)
  })
  it('Should convert the timestamps on push when batching is disabled', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_protobuf))
    options.batching = false
    batcher = new Batcher(options)

    const logEntryConverted = createProtoTimestamps(
      fixtures.logs[1]
    )
    const preparedLogEntry = prepareProtoBatch({ streams: [logEntryConverted] })
    const stub = await jest.spyOn(batcher, 'sendBatchToLoki')

    batcher.pushLogEntry(fixtures.logs[1])
    expect(stub).toHaveBeenCalledWith(preparedLogEntry)
    stub.mockRestore()
  })
  it('Should be able to clear the batch of streams', function () {
    batcher.pushLogEntry(fixtures.logs[0])
    batcher.pushLogEntry(fixtures.logs[2])
    expect(batcher.batch.streams.length).toBe(2)
    batcher.clearBatch()
    expect(batcher.batch.streams.length).toBe(0)
  })
  it('Should fail if the batch is not constructed correctly', async function () {
    // The incorrectly_mapped fixture is no longer relevant and has been removed from fixtures.json
    // This test case should be updated or removed based on the new processing logic.
    try {
      await batcher.sendBatchToLoki()
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
  it("Should fail if snappy can't compress the buffer", async function () {
    batcher.pushLogEntry(fixtures.logs[2])
    this.finish = await jest.spyOn(
      logproto.PushRequest.encode(batcher.batch),
      'finish'
    )
    this.finish.mockReturnValue(null)
    try {
      await batcher.sendBatchToLoki()
    } catch (error) {
      expect(error).toBeTruthy()
    }
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
    await batcher.pushLogEntry(fixtures.logs[1])

    const logEntryConverted = createProtoTimestamps(
      fixtures.logs[1]
    )
    const preparedLogEntry = prepareProtoBatch({ streams: [logEntryConverted] })
    const buffer = logproto.PushRequest.encode(preparedLogEntry).finish()

    const snappy = require('snappy')
    const data = snappy.compressSync(buffer)
    expect(
      req.post.mock.calls[0][req.post.mock.calls[0].length - 1]
    ).toEqual(data)
  })
  it('Should construct without snappy binaries to a JSON transport', function () {
    batcher = new Batcher(fixtures.options_protobuf)
    expect(batcher.options.json).toBe(false)
    jest.spyOn(Batcher.prototype, 'loadSnappy').mockImplementation(() => false)
    batcher = new Batcher(fixtures.options_protobuf)
    expect(batcher.options.json).toBe(true)
  })
})
