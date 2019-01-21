const Batcher = require('../src/batcher')
// const got = require('got')
const fixtures = require('./fixtures.json')
// const sinon = require('sinon')

let batcher

describe('Batcher tests with Protobuf + gRPC transport', function () {
  beforeEach(function () {
    batcher = new Batcher(fixtures.options_protobuf)
  })
  afterEach(function () {
    batcher.clearBatch()
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
  it('Should be able to clear the batch of streams', function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[0]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
    expect(batcher.batch.streams.length).toBe(2)
    batcher.clearBatch()
    expect(batcher.batch.streams.length).toBe(0)
  })
  it('Should be able to construct and send the protobuf to loki', async function () {
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[1]))
    batcher.pushLogEntry(JSON.parse(fixtures.logs_mapped[2]))
    await batcher.sendBatchToLoki()
  })
})
