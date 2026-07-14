const req = require('../src/requests')
const url = require('url')
const { EventEmitter } = require('events')
const http = require('http')
jest.mock('http')
const https = require('https')
jest.mock('https')

const httpUrl = new url.URL('http://localhost:3000' + '/api/prom/push')
const httpsUrl = new url.URL('https://localhost:3000' + '/api/prom/push')
const leanUrl = new url.URL('https://localhost' + '/api/prom/push')
const leanUrl2 = new url.URL('http://localhost' + '/api/prom/push')
const testData = 'test'
const httpsPort = 443
const httpPort = 80

const httpOptions = {
  hostname: httpUrl.hostname,
  port: httpUrl.port !== '' ? httpUrl.port : (httpUrl.protocol === 'https:' ? httpsPort : httpPort),
  path: httpUrl.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': testData.length
  }
}

const httpsOptions = {
  hostname: httpsUrl.hostname,
  port: httpsUrl.port !== '' ? httpsUrl.port : (httpsUrl.protocol === 'https:' ? httpsPort : httpPort),
  path: httpsUrl.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': testData.length
  }
}

const mockedRequest = {
  write: () => null,
  end: () => null,
  on: () => jest.fn(done => done())
}

const mockedResponse = statusCode => (options, callback) => {
  // http is auto-mocked, so build the response on a real EventEmitter
  // to get working on/emit
  const incomingMessage = new EventEmitter()
  incomingMessage.statusCode = statusCode
  callback(incomingMessage)
  incomingMessage.emit('data', testData)
  incomingMessage.emit('end')
  return mockedRequest
}

describe('Requests tests', function () {
  it('Should return promise', function () {
    http.request.mockImplementation(mockedResponse(204))
    https.request.mockImplementation(mockedResponse(204))
    const promise = req.post(httpUrl, httpOptions.headers['Content-Type'], {}, testData)
    expect(typeof promise).toBe('object')
    expect(typeof promise.then).toBe('function')
    expect(
      http.request.mock.calls[0][0]
    ).toEqual(httpOptions)
    req.post(leanUrl, httpOptions.headers['Content-Type'], testData)
    expect(
      https.request.mock.calls[0][0].port
    ).toEqual(httpsPort)
    req.post(leanUrl2, httpOptions.headers['Content-Type'], testData)
    expect(
      http.request.mock.calls[1][0].port
    ).toEqual(httpPort)
  })
  it('Should be able to run https and http', () => {
    const promise = req.post(httpsUrl, httpsOptions.headers['Content-Type'], {}, testData)
    expect(typeof promise).toBe('object')
  })
  it('Should resolve with the response body on a 2xx response', async () => {
    http.request.mockImplementation(mockedResponse(204))
    await expect(
      req.post(httpUrl, httpOptions.headers['Content-Type'], {}, testData)
    ).resolves.toBe(testData)
  })
  it('Should reject with status code and response body on a non-2xx response', async () => {
    http.request.mockImplementation(mockedResponse(400))
    expect.assertions(3)
    try {
      await req.post(httpUrl, httpOptions.headers['Content-Type'], {}, testData)
    } catch (error) {
      expect(error.message).toBe('Server returned HTTP 400: test')
      expect(error.statusCode).toBe(400)
      expect(error.responseBody).toBe(testData)
    }
  })
})
