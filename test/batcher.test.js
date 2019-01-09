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
  it('Should change frequency on failed POST request to host', async function () {
    const batcher = new Batcher(fixtures.options)
    batcher.run()
    batcher.pushLogEntry(fixtures.logs_mapped[0])
    expect(batcher.batch.streams.length).toBe(1)
    await batcher.wait(fixtures.options.interval * 1000 * 20)
    expect(batcher.batch.streams.length).toBe(0)
  })
})
