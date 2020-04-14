const http = require('http')
const https = require('https')

const post = async (lokiUrl, contentType, headers = {}, data = '') => {
  const defaultHeaders = {
    'Content-Type': contentType,
    'Content-Length': data.length
  }
  return new Promise((resolve, reject) => {
    const lib = lokiUrl.protocol === 'https:' ? https : http
    const options = {
      hostname: lokiUrl.hostname,
      port: lokiUrl.port !== '' ? lokiUrl.port : (lokiUrl.protocol === 'https:' ? 443 : 80),
      path: lokiUrl.pathname,
      method: 'POST',
      headers: Object.assign(defaultHeaders, headers)
    }
    const req = lib.request(options, res => {
      let resData = ''
      res.on('data', _data => (resData += _data))
      res.on('end', () => resolve(resData))
    })
    req.on('error', error => {
      reject(error)
    })
    req.write(data)
    req.end()
  })
}

module.exports = { post }
