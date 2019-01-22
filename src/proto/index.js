const path = require('path')
const protobuf = require('protobufjs')
const PROTO_PATH = path.join(__dirname, 'logproto.proto')
console.log(PROTO_PATH)
const loadProto = () =>
  protobuf.load(PROTO_PATH, (err, root) => {
    if (err) throw Error(err)
    return root
  })
module.exports = loadProto
