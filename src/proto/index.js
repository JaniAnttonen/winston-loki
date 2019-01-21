const path = require('path')
const grpc = require('grpc')
const loader = require('@grpc/proto-loader')

const PROTO_PATH = path.join(__dirname, './logproto.proto')

const packageDefinition = loader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const logproto = grpc.loadPackageDefinition(packageDefinition).logproto

module.exports = logproto
