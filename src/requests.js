const http = require('http')
const https = require('https')

const post = async (lokiUrl, contentType, data) => {
  console.log(lokiUrl)
  return new Promise((resolve, reject) => {
    const lib = lokiUrl.protocol === 'https:' ? https : http
    const options = {
      hostname: lokiUrl.hostname,
      port: lokiUrl.port === '' ? 80 : 443,
      path: lokiUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'Content-Length': data.length
      }
    }
    const req = lib.request(options, res => {
      res.on('data', response => {
        resolve(response)
      })
    })
    req.on('error', error => {
      reject(error)
    })
    req.write(data)
    req.end()
  })
}

module.exports = { post }
