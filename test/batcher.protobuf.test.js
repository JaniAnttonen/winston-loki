const Batcher = require('../src/batcher')
const snappy = require('snappy')
const got = require('got')
const { logproto } = require('../src/proto')
const fixtures = require('./fixtures.json')
const sinon = require('sinon')
const moment = require('moment')

const { sortBatch, createProtoTimestamps } = require('../src/proto/helpers')

let batcher

describe('Batcher tests with Protobuf + gRPC transport', function () {
  beforeEach(async function () {
    batcher = new Batcher(fixtures.options_protobuf)
    this.post = await sinon.stub(got, 'post')
  })
  afterEach(function () {
    batcher.clearBatch()
    got.post.restore()
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
  it('Should convert the timestamps on push when batching is disabled', async function () {
    const options = JSON.parse(JSON.stringify(fixtures.options_protobuf))
    options.batching = false
    batcher = new Batcher(options)

    const logEntryConverted = createProtoTimestamps(
      JSON.parse(fixtures.logs_mapped[1])
    )
    const stub = await sinon.stub(batcher, 'sendBatchToLoki')

    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))
    expect(stub.calledWith(logEntryConverted)).toBe(true)
    stub.restore()
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
    got.post.resolves(responseObject)
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))

    const logEntryConverted = createProtoTimestamps(
      JSON.parse(fixtures.logs_mapped[1])
    )
    const buffer = logproto.PushRequest.encode({
      streams: [logEntryConverted]
    }).finish()
    const data = snappy.compressSync(buffer)

    expect(got.post.lastCall.lastArg.body).toEqual(data)
  })
  it('Should sort the batch correctly', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))
    let dt = moment(fixtures.logs[2].timestamp).valueOf()
    let timestamp = {
      seconds: Math.floor(dt / 1000),
      nanos: (dt % 1000) * 1000
    }

    expect(batcher.batch.streams[0].entries[0].timestamp).toEqual(timestamp)
    batcher.batch = sortBatch(batcher.batch)

    dt = moment(fixtures.logs[1].timestamp).valueOf()
    timestamp = {
      seconds: Math.floor(dt / 1000),
      nanos: (dt % 1000) * 1000
    }

    expect(batcher.batch.streams[0].entries[0].timestamp).toEqual(timestamp)

    dt = moment(fixtures.logs[2].timestamp).valueOf()
    timestamp = {
      seconds: Math.floor(dt / 1000),
      nanos: (dt % 1000) * 1000 + 1
    }
    expect(batcher.batch.streams[0].entries[1].timestamp).toEqual(timestamp)
  })
  it('Should be able to clear the batch of streams', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
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
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
    this.finish = await sinon.stub(
      logproto.PushRequest.encode(batcher.batch),
      'finish'
    )
    this.finish.returns(null)
    try {
      await batcher.sendBatchToLoki()
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
})
