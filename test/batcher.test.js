/* eslint-env jest */
const Batcher = require('../src/batcher')
const fixtures = require('./fixtures.json')

describe('Batcher tests', function () {
  it('Should add same items as separate streams', function () {
    const batcher = new Batcher(fixtures.options)
    batcher.pushLogEntry(fixtures.logs_mapped[0])
    batcher.pushLogEntry(fixtures.logs_mapped[0])
    expect(batcher.batch.streams.length).toBe(2)
  })
  it('Should add items with same labels as separate streams', function () {
    const batcher = new Batcher(fixtures.options)
    batcher.pushLogEntry(fixtures.logs_mapped[0])
    batcher.pushLogEntry(fixtures.logs_mapped[2])
    expect(batcher.batch.streams.length).toBe(2)
  })
  it('Should be able to clear the batch of streams', function () {
    const batcher = new Batcher(fixtures.options)
    batcher.pushLogEntry(fixtures.logs_mapped[0])
    batcher.pushLogEntry(fixtures.logs_mapped[2])
    expect(batcher.batch.streams.length).toBe(2)
    batcher.clearBatch()
    expect(batcher.batch.streams.length).toBe(0)
  })
})
