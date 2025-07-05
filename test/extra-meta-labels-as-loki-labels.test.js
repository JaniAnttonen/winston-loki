const fetch = require('node-fetch')
const { createLogger } = require('winston')
const LokiTransport = require('../index.js')
const fixtures = require('./fixtures.json')


class LokiClient {
  static async getLogs (query, lokiHost) {
    const url = new URL('loki/api/v1/query_range', lokiHost)
    url.searchParams.append('query', query)
    url.searchParams.append('limit', '10')

    // eslint-disable-next-line no-undef
    return fetch(url, {
    }).then((response) => response.json())
  }
}
describe('Loki Meta tests', function () {
  it('Winston will append meta attributes to loki labels', async function () {
    const options = {
      transports: [new LokiTransport({
        ...fixtures.options_labels,
        host: process.env.LOKI_HOST,
        ignoredMeta: ['level'],
        metaToUseAsLabels: ['extraMeta']
      })]
    }
    const logeMessage = 'testing the application'

    // Create logger and add extra meta value
    const logger = createLogger(options)
    logger.info(logeMessage, { extraMeta: 'testValue' })

    // Verify logger creation and meta value
    expect(logger.constructor.name).toBe('DerivedLogger')
    expect(logger._readableState.pipesCount).toBe(1)

    const result = await LokiClient.getLogs('{extraMeta="testValue"}', process.env.LOKI_HOST)
    expect(result.status).toBe('success')
    expect(result.data.result.length).toBe(1)

    const log = result.data.result[0]
    expect(log.stream.extraMeta).toBe('testValue') // the value added rom the meta object
    expect(log.stream.testingLabel).toBe('testingLabelValue') // the original label value
    expect(log.values[0][1]).toBe(logeMessage) // the message
  })
})
