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
    const circuitBreakerInterval = fixtures.options.interval * 1000 * 1.5
    const waitFor = fixtures.options.interval * 1000 * 2

    batcher.circuitBreakerInterval = circuitBreakerInterval
    batcher.run()
    batcher.pushLogEntry(fixtures.logs_mapped[0])

    expect(batcher.batch.streams.length).toBe(1)

    await batcher.wait(waitFor)

    expect(batcher.batch.streams.length).toBe(1)
    expect(batcher.interval).toBe(circuitBreakerInterval)
  })
})
