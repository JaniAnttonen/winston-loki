const http = require('http')
const https = require('https')

const post = async (lokiUrl, contentType, headers = {}, data = '', timeout, httpAgent, httpsAgent) => {
  // Construct a buffer from the data string to have deterministic data size
  const dataBuffer = Buffer.from(data, 'utf8')

  // Construct the headers
  const defaultHeaders = {
    'Content-Type': contentType,
    'Content-Length': dataBuffer.length
  }

  return new Promise((resolve, reject) => {
    // Decide which http library to use based on the url
    const lib = lokiUrl.protocol === 'https:' ? https : http
    const agent = lokiUrl.protocol === 'https:' ? httpsAgent : httpAgent

    // Construct the node request options
    const options = {
      hostname: lokiUrl.hostname,
      port: lokiUrl.port !== '' ? lokiUrl.port : (lokiUrl.protocol === 'https:' ? 443 : 80),
      path: lokiUrl.pathname,
      method: 'POST',
      headers: Object.assign(defaultHeaders, headers),
      timeout: timeout,
      agent: agent
    }

    // Construct the request
    const req = lib.request(options, res => {
      let resData = ''
      res.on('data', _data => (resData += _data))
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(resData)
        } else {
          const error = new Error(
            `Server returned HTTP ${res.statusCode}${resData ? ': ' + resData.trim() : ''}`
          )
          error.statusCode = res.statusCode
          error.responseBody = resData
          reject(error)
        }
      })
    })

    // Error listener
    req.on('error', error => {
      reject(error)
    })

    // Node only emits 'timeout' — it never aborts the request by itself, so
    // without this the promise stays pending forever on an unresponsive server
    req.on('timeout', () => {
      req.destroy(new Error(`Loki push timed out after ${timeout}ms`))
    })

    // Write to request
    req.write(dataBuffer)
    req.end()
  })
}

module.exports = { post }
