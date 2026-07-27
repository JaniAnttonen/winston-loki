const { prepareJSONBatch } = require('../src/proto/helpers')

describe('prepareJSONBatch', function () {
  function batchWithRest (rest) {
    return {
      streams: [
        {
          labels: { level: 'info' },
          entries: [{ ts: 1700000000000, line: 'msg', rest }]
        }
      ]
    }
  }

  it('Should keep string meta values as they are', function () {
    const { streams } = prepareJSONBatch(batchWithRest({ app: 'repro' }))
    expect(streams[0].values[0]).toEqual([
      '1700000000000000000',
      'msg',
      { app: 'repro' }
    ])
  })

  it('Should convert non-string meta values to strings for structured metadata', function () {
    const { streams } = prepareJSONBatch(
      batchWithRest({
        count: 5,
        flag: true,
        nested: { a: 1 },
        list: [1, 'two']
      })
    )
    expect(streams[0].values[0][2]).toEqual({
      count: '5',
      flag: 'true',
      nested: '{"a":1}',
      list: '[1,"two"]'
    })
  })

  it('Should handle missing meta', function () {
    const { streams } = prepareJSONBatch(batchWithRest(undefined))
    expect(streams[0].values[0][2]).toEqual({})
  })
})
