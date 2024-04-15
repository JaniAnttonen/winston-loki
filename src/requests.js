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
      res.on('end', () => resolve(resData))
    })

    // Error listener
    req.on('error', error => {
      reject(error)
    })

    // Write to request
    req.write(dataBuffer)
    req.end()
  })
}

module.exports = { post }
