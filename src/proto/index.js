/* eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars */
'use strict'

var $protobuf = require('protobufjs/minimal')

// Common aliases
var $Reader = $protobuf.Reader; var $Writer = $protobuf.Writer; var $util = $protobuf.util

// Exported root namespace
var $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

$root.logproto = (function () {
  /**
     * Namespace logproto.
     * @exports logproto
     * @namespace
     */
  var logproto = {}

  logproto.Pusher = (function () {
    /**
         * Constructs a new Pusher service.
         * @memberof logproto
         * @classdesc Represents a Pusher
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
    function Pusher (rpcImpl, requestDelimited, responseDelimited) {
      $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited)
    }

    (Pusher.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Pusher

    /**
         * Creates new Pusher service using the specified rpc implementation.
         * @function create
         * @memberof logproto.Pusher
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Pusher} RPC service. Useful where requests and/or responses are streamed.
         */
    Pusher.create = function create (rpcImpl, requestDelimited, responseDelimited) {
      return new this(rpcImpl, requestDelimited, responseDelimited)
    }

    /**
         * Callback as used by {@link logproto.Pusher#push}.
         * @memberof logproto.Pusher
         * @typedef PushCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {logproto.PushResponse} [response] PushResponse
         */

    /**
         * Calls Push.
         * @function push
         * @memberof logproto.Pusher
         * @instance
         * @param {logproto.IPushRequest} request PushRequest message or plain object
         * @param {logproto.Pusher.PushCallback} callback Node-style callback called with the error, if any, and PushResponse
         * @returns {undefined}
         * @variation 1
         */
    Object.defineProperty(Pusher.prototype.push = function push (request, callback) {
      return this.rpcCall(push, $root.logproto.PushRequest, $root.logproto.PushResponse, request, callback)
    }, 'name', { value: 'Push' })

    /**
         * Calls Push.
         * @function push
         * @memberof logproto.Pusher
         * @instance
         * @param {logproto.IPushRequest} request PushRequest message or plain object
         * @returns {Promise<logproto.PushResponse>} Promise
         * @variation 2
         */

    return Pusher
  })()

  logproto.Querier = (function () {
    /**
         * Constructs a new Querier service.
         * @memberof logproto
         * @classdesc Represents a Querier
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
    function Querier (rpcImpl, requestDelimited, responseDelimited) {
      $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited)
    }

    (Querier.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Querier

    /**
         * Creates new Querier service using the specified rpc implementation.
         * @function create
         * @memberof logproto.Querier
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Querier} RPC service. Useful where requests and/or responses are streamed.
         */
    Querier.create = function create (rpcImpl, requestDelimited, responseDelimited) {
      return new this(rpcImpl, requestDelimited, responseDelimited)
    }

    /**
         * Callback as used by {@link logproto.Querier#query}.
         * @memberof logproto.Querier
         * @typedef QueryCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {logproto.QueryResponse} [response] QueryResponse
         */

    /**
         * Calls Query.
         * @function query
         * @memberof logproto.Querier
         * @instance
         * @param {logproto.IQueryRequest} request QueryRequest message or plain object
         * @param {logproto.Querier.QueryCallback} callback Node-style callback called with the error, if any, and QueryResponse
         * @returns {undefined}
         * @variation 1
         */
    Object.defineProperty(Querier.prototype.query = function query (request, callback) {
      return this.rpcCall(query, $root.logproto.QueryRequest, $root.logproto.QueryResponse, request, callback)
    }, 'name', { value: 'Query' })

    /**
         * Calls Query.
         * @function query
         * @memberof logproto.Querier
         * @instance
         * @param {logproto.IQueryRequest} request QueryRequest message or plain object
         * @returns {Promise<logproto.QueryResponse>} Promise
         * @variation 2
         */

    /**
         * Callback as used by {@link logproto.Querier#label}.
         * @memberof logproto.Querier
         * @typedef LabelCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {logproto.LabelResponse} [response] LabelResponse
         */

    /**
         * Calls Label.
         * @function label
         * @memberof logproto.Querier
         * @instance
         * @param {logproto.ILabelRequest} request LabelRequest message or plain object
         * @param {logproto.Querier.LabelCallback} callback Node-style callback called with the error, if any, and LabelResponse
         * @returns {undefined}
         * @variation 1
         */
    Object.defineProperty(Querier.prototype.label = function label (request, callback) {
      return this.rpcCall(label, $root.logproto.LabelRequest, $root.logproto.LabelResponse, request, callback)
    }, 'name', { value: 'Label' })

    /**
         * Calls Label.
         * @function label
         * @memberof logproto.Querier
         * @instance
         * @param {logproto.ILabelRequest} request LabelRequest message or plain object
         * @returns {Promise<logproto.LabelResponse>} Promise
         * @variation 2
         */

    return Querier
  })()

  logproto.PushRequest = (function () {
    /**
         * Properties of a PushRequest.
         * @memberof logproto
         * @interface IPushRequest
         * @property {Array.<logproto.IStream>|null} [streams] PushRequest streams
         */

    /**
         * Constructs a new PushRequest.
         * @memberof logproto
         * @classdesc Represents a PushRequest.
         * @implements IPushRequest
         * @constructor
         * @param {logproto.IPushRequest=} [properties] Properties to set
         */
    function PushRequest (properties) {
      this.streams = []
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
         * PushRequest streams.
         * @member {Array.<logproto.IStream>} streams
         * @memberof logproto.PushRequest
         * @instance
         */
    PushRequest.prototype.streams = $util.emptyArray

    /**
         * Creates a new PushRequest instance using the specified properties.
         * @function create
         * @memberof logproto.PushRequest
         * @static
         * @param {logproto.IPushRequest=} [properties] Properties to set
         * @returns {logproto.PushRequest} PushRequest instance
         */
    PushRequest.create = function create (properties) {
      return new PushRequest(properties)
    }

    /**
         * Encodes the specified PushRequest message. Does not implicitly {@link logproto.PushRequest.verify|verify} messages.
         * @function encode
         * @memberof logproto.PushRequest
         * @static
         * @param {logproto.IPushRequest} message PushRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    PushRequest.encode = function encode (message, writer) {
      if (!writer) { writer = $Writer.create() }
      if (message.streams != null && message.streams.length) {
        for (var i = 0; i < message.streams.length; ++i) { $root.logproto.Stream.encode(message.streams[i], writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim() }
      }
      return writer
    }

    /**
         * Encodes the specified PushRequest message, length delimited. Does not implicitly {@link logproto.PushRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.PushRequest
         * @static
         * @param {logproto.IPushRequest} message PushRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    PushRequest.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
         * Decodes a PushRequest message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.PushRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.PushRequest} PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    PushRequest.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.logproto.PushRequest()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1:
            if (!(message.streams && message.streams.length)) { message.streams = [] }
            message.streams.push($root.logproto.Stream.decode(reader, reader.uint32()))
            break
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
         * Decodes a PushRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof logproto.PushRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.PushRequest} PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    PushRequest.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
         * Verifies a PushRequest message.
         * @function verify
         * @memberof logproto.PushRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
    PushRequest.verify = function verify (message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      if (message.streams != null && message.hasOwnProperty('streams')) {
        if (!Array.isArray(message.streams)) { return 'streams: array expected' }
        for (var i = 0; i < message.streams.length; ++i) {
          var error = $root.logproto.Stream.verify(message.streams[i])
          if (error) { return 'streams.' + error }
        }
      }
      return null
    }

    /**
         * Creates a PushRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof logproto.PushRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.PushRequest} PushRequest
         */
    PushRequest.fromObject = function fromObject (object) {
      if (object instanceof $root.logproto.PushRequest) { return object }
      var message = new $root.logproto.PushRequest()
      if (object.streams) {
        if (!Array.isArray(object.streams)) { throw TypeError('.logproto.PushRequest.streams: array expected') }
        message.streams = []
        for (var i = 0; i < object.streams.length; ++i) {
          if (typeof object.streams[i] !== 'object') { throw TypeError('.logproto.PushRequest.streams: object expected') }
          message.streams[i] = $root.logproto.Stream.fromObject(object.streams[i])
        }
      }
      return message
    }

    /**
         * Creates a plain object from a PushRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof logproto.PushRequest
         * @static
         * @param {logproto.PushRequest} message PushRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
    PushRequest.toObject = function toObject (message, options) {
      if (!options) { options = {} }
      var object = {}
      if (options.arrays || options.defaults) { object.streams = [] }
      if (message.streams && message.streams.length) {
        object.streams = []
        for (var j = 0; j < message.streams.length; ++j) { object.streams[j] = $root.logproto.Stream.toObject(message.streams[j], options) }
      }
      return object
    }

    /**
         * Converts this PushRequest to JSON.
         * @function toJSON
         * @memberof logproto.PushRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
    PushRequest.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    return PushRequest
  })()

  logproto.PushResponse = (function () {
    /**
         * Properties of a PushResponse.
         * @memberof logproto
         * @interface IPushResponse
         */

    /**
         * Constructs a new PushResponse.
         * @memberof logproto
         * @classdesc Represents a PushResponse.
         * @implements IPushResponse
         * @constructor
         * @param {logproto.IPushResponse=} [properties] Properties to set
         */
    function PushResponse (properties) {
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
         * Creates a new PushResponse instance using the specified properties.
         * @function create
         * @memberof logproto.PushResponse
         * @static
         * @param {logproto.IPushResponse=} [properties] Properties to set
         * @returns {logproto.PushResponse} PushResponse instance
         */
    PushResponse.create = function create (properties) {
      return new PushResponse(properties)
    }

    /**
         * Encodes the specified PushResponse message. Does not implicitly {@link logproto.PushResponse.verify|verify} messages.
         * @function encode
         * @memberof logproto.PushResponse
         * @static
         * @param {logproto.IPushResponse} message PushResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    PushResponse.encode = function encode (message, writer) {
      if (!writer) { writer = $Writer.create() }
      return writer
    }

    /**
         * Encodes the specified PushResponse message, length delimited. Does not implicitly {@link logproto.PushResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.PushResponse
         * @static
         * @param {logproto.IPushResponse} message PushResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    PushResponse.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
         * Decodes a PushResponse message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.PushResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.PushResponse} PushResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    PushResponse.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.logproto.PushResponse()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
         * Decodes a PushResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof logproto.PushResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.PushResponse} PushResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    PushResponse.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
         * Verifies a PushResponse message.
         * @function verify
         * @memberof logproto.PushResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
    PushResponse.verify = function verify (message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      return null
    }

    /**
         * Creates a PushResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof logproto.PushResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.PushResponse} PushResponse
         */
    PushResponse.fromObject = function fromObject (object) {
      if (object instanceof $root.logproto.PushResponse) { return object }
      return new $root.logproto.PushResponse()
    }

    /**
         * Creates a plain object from a PushResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof logproto.PushResponse
         * @static
         * @param {logproto.PushResponse} message PushResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
    PushResponse.toObject = function toObject () {
      return {}
    }

    /**
         * Converts this PushResponse to JSON.
         * @function toJSON
         * @memberof logproto.PushResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
    PushResponse.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    return PushResponse
  })()

  logproto.QueryRequest = (function () {
    /**
         * Properties of a QueryRequest.
         * @memberof logproto
         * @interface IQueryRequest
         * @property {string|null} [query] QueryRequest query
         * @property {number|null} [limit] QueryRequest limit
         * @property {google.protobuf.ITimestamp|null} [start] QueryRequest start
         * @property {google.protobuf.ITimestamp|null} [end] QueryRequest end
         * @property {logproto.Direction|null} [direction] QueryRequest direction
         * @property {string|null} [regex] QueryRequest regex
         */

    /**
         * Constructs a new QueryRequest.
         * @memberof logproto
         * @classdesc Represents a QueryRequest.
         * @implements IQueryRequest
         * @constructor
         * @param {logproto.IQueryRequest=} [properties] Properties to set
         */
    function QueryRequest (properties) {
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
         * QueryRequest query.
         * @member {string} query
         * @memberof logproto.QueryRequest
         * @instance
         */
    QueryRequest.prototype.query = ''

    /**
         * QueryRequest limit.
         * @member {number} limit
         * @memberof logproto.QueryRequest
         * @instance
         */
    QueryRequest.prototype.limit = 0

    /**
         * QueryRequest start.
         * @member {google.protobuf.ITimestamp|null|undefined} start
         * @memberof logproto.QueryRequest
         * @instance
         */
    QueryRequest.prototype.start = null

    /**
         * QueryRequest end.
         * @member {google.protobuf.ITimestamp|null|undefined} end
         * @memberof logproto.QueryRequest
         * @instance
         */
    QueryRequest.prototype.end = null

    /**
         * QueryRequest direction.
         * @member {logproto.Direction} direction
         * @memberof logproto.QueryRequest
         * @instance
         */
    QueryRequest.prototype.direction = 0

    /**
         * QueryRequest regex.
         * @member {string} regex
         * @memberof logproto.QueryRequest
         * @instance
         */
    QueryRequest.prototype.regex = ''

    /**
         * Creates a new QueryRequest instance using the specified properties.
         * @function create
         * @memberof logproto.QueryRequest
         * @static
         * @param {logproto.IQueryRequest=} [properties] Properties to set
         * @returns {logproto.QueryRequest} QueryRequest instance
         */
    QueryRequest.create = function create (properties) {
      return new QueryRequest(properties)
    }

    /**
         * Encodes the specified QueryRequest message. Does not implicitly {@link logproto.QueryRequest.verify|verify} messages.
         * @function encode
         * @memberof logproto.QueryRequest
         * @static
         * @param {logproto.IQueryRequest} message QueryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    QueryRequest.encode = function encode (message, writer) {
      if (!writer) { writer = $Writer.create() }
      if (message.query != null && message.hasOwnProperty('query')) { writer.uint32(/* id 1, wireType 2 = */10).string(message.query) }
      if (message.limit != null && message.hasOwnProperty('limit')) { writer.uint32(/* id 2, wireType 0 = */16).uint32(message.limit) }
      if (message.start != null && message.hasOwnProperty('start')) { $root.google.protobuf.Timestamp.encode(message.start, writer.uint32(/* id 3, wireType 2 = */26).fork()).ldelim() }
      if (message.end != null && message.hasOwnProperty('end')) { $root.google.protobuf.Timestamp.encode(message.end, writer.uint32(/* id 4, wireType 2 = */34).fork()).ldelim() }
      if (message.direction != null && message.hasOwnProperty('direction')) { writer.uint32(/* id 5, wireType 0 = */40).int32(message.direction) }
      if (message.regex != null && message.hasOwnProperty('regex')) { writer.uint32(/* id 6, wireType 2 = */50).string(message.regex) }
      return writer
    }

    /**
         * Encodes the specified QueryRequest message, length delimited. Does not implicitly {@link logproto.QueryRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.QueryRequest
         * @static
         * @param {logproto.IQueryRequest} message QueryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    QueryRequest.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
         * Decodes a QueryRequest message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.QueryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.QueryRequest} QueryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    QueryRequest.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.logproto.QueryRequest()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1:
            message.query = reader.string()
            break
          case 2:
            message.limit = reader.uint32()
            break
          case 3:
            message.start = $root.google.protobuf.Timestamp.decode(reader, reader.uint32())
            break
          case 4:
            message.end = $root.google.protobuf.Timestamp.decode(reader, reader.uint32())
            break
          case 5:
            message.direction = reader.int32()
            break
          case 6:
            message.regex = reader.string()
            break
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
         * Decodes a QueryRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof logproto.QueryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.QueryRequest} QueryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    QueryRequest.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
         * Verifies a QueryRequest message.
         * @function verify
         * @memberof logproto.QueryRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
    QueryRequest.verify = function verify (message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      if (message.query != null && message.hasOwnProperty('query')) {
        if (!$util.isString(message.query)) { return 'query: string expected' }
      }
      if (message.limit != null && message.hasOwnProperty('limit')) {
        if (!$util.isInteger(message.limit)) { return 'limit: integer expected' }
      }
      if (message.start != null && message.hasOwnProperty('start')) {
        var error = $root.google.protobuf.Timestamp.verify(message.start)
        if (error) { return 'start.' + error }
      }
      if (message.end != null && message.hasOwnProperty('end')) {
        var error = $root.google.protobuf.Timestamp.verify(message.end)
        if (error) { return 'end.' + error }
      }
      if (message.direction != null && message.hasOwnProperty('direction')) {
        switch (message.direction) {
          default:
            return 'direction: enum value expected'
          case 0:
          case 1:
            break
        }
      }
      if (message.regex != null && message.hasOwnProperty('regex')) {
        if (!$util.isString(message.regex)) { return 'regex: string expected' }
      }
      return null
    }

    /**
         * Creates a QueryRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof logproto.QueryRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.QueryRequest} QueryRequest
         */
    QueryRequest.fromObject = function fromObject (object) {
      if (object instanceof $root.logproto.QueryRequest) { return object }
      var message = new $root.logproto.QueryRequest()
      if (object.query != null) { message.query = String(object.query) }
      if (object.limit != null) { message.limit = object.limit >>> 0 }
      if (object.start != null) {
        if (typeof object.start !== 'object') { throw TypeError('.logproto.QueryRequest.start: object expected') }
        message.start = $root.google.protobuf.Timestamp.fromObject(object.start)
      }
      if (object.end != null) {
        if (typeof object.end !== 'object') { throw TypeError('.logproto.QueryRequest.end: object expected') }
        message.end = $root.google.protobuf.Timestamp.fromObject(object.end)
      }
      switch (object.direction) {
        case 'FORWARD':
        case 0:
          message.direction = 0
          break
        case 'BACKWARD':
        case 1:
          message.direction = 1
          break
      }
      if (object.regex != null) { message.regex = String(object.regex) }
      return message
    }

    /**
         * Creates a plain object from a QueryRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof logproto.QueryRequest
         * @static
         * @param {logproto.QueryRequest} message QueryRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
    QueryRequest.toObject = function toObject (message, options) {
      if (!options) { options = {} }
      var object = {}
      if (options.defaults) {
        object.query = ''
        object.limit = 0
        object.start = null
        object.end = null
        object.direction = options.enums === String ? 'FORWARD' : 0
        object.regex = ''
      }
      if (message.query != null && message.hasOwnProperty('query')) { object.query = message.query }
      if (message.limit != null && message.hasOwnProperty('limit')) { object.limit = message.limit }
      if (message.start != null && message.hasOwnProperty('start')) { object.start = $root.google.protobuf.Timestamp.toObject(message.start, options) }
      if (message.end != null && message.hasOwnProperty('end')) { object.end = $root.google.protobuf.Timestamp.toObject(message.end, options) }
      if (message.direction != null && message.hasOwnProperty('direction')) { object.direction = options.enums === String ? $root.logproto.Direction[message.direction] : message.direction }
      if (message.regex != null && message.hasOwnProperty('regex')) { object.regex = message.regex }
      return object
    }

    /**
         * Converts this QueryRequest to JSON.
         * @function toJSON
         * @memberof logproto.QueryRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
    QueryRequest.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    return QueryRequest
  })()

  /**
     * Direction enum.
     * @name logproto.Direction
     * @enum {string}
     * @property {number} FORWARD=0 FORWARD value
     * @property {number} BACKWARD=1 BACKWARD value
     */
  logproto.Direction = (function () {
    var valuesById = {}; var values = Object.create(valuesById)
    values[valuesById[0] = 'FORWARD'] = 0
    values[valuesById[1] = 'BACKWARD'] = 1
    return values
  })()

  logproto.QueryResponse = (function () {
    /**
         * Properties of a QueryResponse.
         * @memberof logproto
         * @interface IQueryResponse
         * @property {Array.<logproto.IStream>|null} [streams] QueryResponse streams
         */

    /**
         * Constructs a new QueryResponse.
         * @memberof logproto
         * @classdesc Represents a QueryResponse.
         * @implements IQueryResponse
         * @constructor
         * @param {logproto.IQueryResponse=} [properties] Properties to set
         */
    function QueryResponse (properties) {
      this.streams = []
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
         * QueryResponse streams.
         * @member {Array.<logproto.IStream>} streams
         * @memberof logproto.QueryResponse
         * @instance
         */
    QueryResponse.prototype.streams = $util.emptyArray

    /**
         * Creates a new QueryResponse instance using the specified properties.
         * @function create
         * @memberof logproto.QueryResponse
         * @static
         * @param {logproto.IQueryResponse=} [properties] Properties to set
         * @returns {logproto.QueryResponse} QueryResponse instance
         */
    QueryResponse.create = function create (properties) {
      return new QueryResponse(properties)
    }

    /**
         * Encodes the specified QueryResponse message. Does not implicitly {@link logproto.QueryResponse.verify|verify} messages.
         * @function encode
         * @memberof logproto.QueryResponse
         * @static
         * @param {logproto.IQueryResponse} message QueryResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    QueryResponse.encode = function encode (message, writer) {
      if (!writer) { writer = $Writer.create() }
      if (message.streams != null && message.streams.length) {
        for (var i = 0; i < message.streams.length; ++i) { $root.logproto.Stream.encode(message.streams[i], writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim() }
      }
      return writer
    }

    /**
         * Encodes the specified QueryResponse message, length delimited. Does not implicitly {@link logproto.QueryResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.QueryResponse
         * @static
         * @param {logproto.IQueryResponse} message QueryResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    QueryResponse.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
         * Decodes a QueryResponse message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.QueryResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.QueryResponse} QueryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    QueryResponse.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.logproto.QueryResponse()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1:
            if (!(message.streams && message.streams.length)) { message.streams = [] }
            message.streams.push($root.logproto.Stream.decode(reader, reader.uint32()))
            break
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
         * Decodes a QueryResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof logproto.QueryResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.QueryResponse} QueryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    QueryResponse.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
         * Verifies a QueryResponse message.
         * @function verify
         * @memberof logproto.QueryResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
    QueryResponse.verify = function verify (message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      if (message.streams != null && message.hasOwnProperty('streams')) {
        if (!Array.isArray(message.streams)) { return 'streams: array expected' }
        for (var i = 0; i < message.streams.length; ++i) {
          var error = $root.logproto.Stream.verify(message.streams[i])
          if (error) { return 'streams.' + error }
        }
      }
      return null
    }

    /**
         * Creates a QueryResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof logproto.QueryResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.QueryResponse} QueryResponse
         */
    QueryResponse.fromObject = function fromObject (object) {
      if (object instanceof $root.logproto.QueryResponse) { return object }
      var message = new $root.logproto.QueryResponse()
      if (object.streams) {
        if (!Array.isArray(object.streams)) { throw TypeError('.logproto.QueryResponse.streams: array expected') }
        message.streams = []
        for (var i = 0; i < object.streams.length; ++i) {
          if (typeof object.streams[i] !== 'object') { throw TypeError('.logproto.QueryResponse.streams: object expected') }
          message.streams[i] = $root.logproto.Stream.fromObject(object.streams[i])
        }
      }
      return message
    }

    /**
         * Creates a plain object from a QueryResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof logproto.QueryResponse
         * @static
         * @param {logproto.QueryResponse} message QueryResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
    QueryResponse.toObject = function toObject (message, options) {
      if (!options) { options = {} }
      var object = {}
      if (options.arrays || options.defaults) { object.streams = [] }
      if (message.streams && message.streams.length) {
        object.streams = []
        for (var j = 0; j < message.streams.length; ++j) { object.streams[j] = $root.logproto.Stream.toObject(message.streams[j], options) }
      }
      return object
    }

    /**
         * Converts this QueryResponse to JSON.
         * @function toJSON
         * @memberof logproto.QueryResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
    QueryResponse.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    return QueryResponse
  })()

  logproto.LabelRequest = (function () {
    /**
         * Properties of a LabelRequest.
         * @memberof logproto
         * @interface ILabelRequest
         * @property {string|null} [name] LabelRequest name
         * @property {boolean|null} [values] LabelRequest values
         */

    /**
         * Constructs a new LabelRequest.
         * @memberof logproto
         * @classdesc Represents a LabelRequest.
         * @implements ILabelRequest
         * @constructor
         * @param {logproto.ILabelRequest=} [properties] Properties to set
         */
    function LabelRequest (properties) {
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
         * LabelRequest name.
         * @member {string} name
         * @memberof logproto.LabelRequest
         * @instance
         */
    LabelRequest.prototype.name = ''

    /**
         * LabelRequest values.
         * @member {boolean} values
         * @memberof logproto.LabelRequest
         * @instance
         */
    LabelRequest.prototype.values = false

    /**
         * Creates a new LabelRequest instance using the specified properties.
         * @function create
         * @memberof logproto.LabelRequest
         * @static
         * @param {logproto.ILabelRequest=} [properties] Properties to set
         * @returns {logproto.LabelRequest} LabelRequest instance
         */
    LabelRequest.create = function create (properties) {
      return new LabelRequest(properties)
    }

    /**
         * Encodes the specified LabelRequest message. Does not implicitly {@link logproto.LabelRequest.verify|verify} messages.
         * @function encode
         * @memberof logproto.LabelRequest
         * @static
         * @param {logproto.ILabelRequest} message LabelRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    LabelRequest.encode = function encode (message, writer) {
      if (!writer) { writer = $Writer.create() }
      if (message.name != null && message.hasOwnProperty('name')) { writer.uint32(/* id 1, wireType 2 = */10).string(message.name) }
      if (message.values != null && message.hasOwnProperty('values')) { writer.uint32(/* id 2, wireType 0 = */16).bool(message.values) }
      return writer
    }

    /**
         * Encodes the specified LabelRequest message, length delimited. Does not implicitly {@link logproto.LabelRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.LabelRequest
         * @static
         * @param {logproto.ILabelRequest} message LabelRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    LabelRequest.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
         * Decodes a LabelRequest message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.LabelRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.LabelRequest} LabelRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    LabelRequest.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.logproto.LabelRequest()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1:
            message.name = reader.string()
            break
          case 2:
            message.values = reader.bool()
            break
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
         * Decodes a LabelRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof logproto.LabelRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.LabelRequest} LabelRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    LabelRequest.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
         * Verifies a LabelRequest message.
         * @function verify
         * @memberof logproto.LabelRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
    LabelRequest.verify = function verify (message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      if (message.name != null && message.hasOwnProperty('name')) {
        if (!$util.isString(message.name)) { return 'name: string expected' }
      }
      if (message.values != null && message.hasOwnProperty('values')) {
        if (typeof message.values !== 'boolean') { return 'values: boolean expected' }
      }
      return null
    }

    /**
         * Creates a LabelRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof logproto.LabelRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.LabelRequest} LabelRequest
         */
    LabelRequest.fromObject = function fromObject (object) {
      if (object instanceof $root.logproto.LabelRequest) { return object }
      var message = new $root.logproto.LabelRequest()
      if (object.name != null) { message.name = String(object.name) }
      if (object.values != null) { message.values = Boolean(object.values) }
      return message
    }

    /**
         * Creates a plain object from a LabelRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof logproto.LabelRequest
         * @static
         * @param {logproto.LabelRequest} message LabelRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
    LabelRequest.toObject = function toObject (message, options) {
      if (!options) { options = {} }
      var object = {}
      if (options.defaults) {
        object.name = ''
        object.values = false
      }
      if (message.name != null && message.hasOwnProperty('name')) { object.name = message.name }
      if (message.values != null && message.hasOwnProperty('values')) { object.values = message.values }
      return object
    }

    /**
         * Converts this LabelRequest to JSON.
         * @function toJSON
         * @memberof logproto.LabelRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
    LabelRequest.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    return LabelRequest
  })()

  logproto.LabelResponse = (function () {
    /**
         * Properties of a LabelResponse.
         * @memberof logproto
         * @interface ILabelResponse
         * @property {Array.<string>|null} [values] LabelResponse values
         */

    /**
         * Constructs a new LabelResponse.
         * @memberof logproto
         * @classdesc Represents a LabelResponse.
         * @implements ILabelResponse
         * @constructor
         * @param {logproto.ILabelResponse=} [properties] Properties to set
         */
    function LabelResponse (properties) {
      this.values = []
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
         * LabelResponse values.
         * @member {Array.<string>} values
         * @memberof logproto.LabelResponse
         * @instance
         */
    LabelResponse.prototype.values = $util.emptyArray

    /**
         * Creates a new LabelResponse instance using the specified properties.
         * @function create
         * @memberof logproto.LabelResponse
         * @static
         * @param {logproto.ILabelResponse=} [properties] Properties to set
         * @returns {logproto.LabelResponse} LabelResponse instance
         */
    LabelResponse.create = function create (properties) {
      return new LabelResponse(properties)
    }

    /**
         * Encodes the specified LabelResponse message. Does not implicitly {@link logproto.LabelResponse.verify|verify} messages.
         * @function encode
         * @memberof logproto.LabelResponse
         * @static
         * @param {logproto.ILabelResponse} message LabelResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    LabelResponse.encode = function encode (message, writer) {
      if (!writer) { writer = $Writer.create() }
      if (message.values != null && message.values.length) {
        for (var i = 0; i < message.values.length; ++i) { writer.uint32(/* id 1, wireType 2 = */10).string(message.values[i]) }
      }
      return writer
    }

    /**
         * Encodes the specified LabelResponse message, length delimited. Does not implicitly {@link logproto.LabelResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.LabelResponse
         * @static
         * @param {logproto.ILabelResponse} message LabelResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    LabelResponse.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
         * Decodes a LabelResponse message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.LabelResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.LabelResponse} LabelResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    LabelResponse.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.logproto.LabelResponse()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1:
            if (!(message.values && message.values.length)) { message.values = [] }
            message.values.push(reader.string())
            break
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
         * Decodes a LabelResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof logproto.LabelResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.LabelResponse} LabelResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    LabelResponse.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
         * Verifies a LabelResponse message.
         * @function verify
         * @memberof logproto.LabelResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
    LabelResponse.verify = function verify (message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      if (message.values != null && message.hasOwnProperty('values')) {
        if (!Array.isArray(message.values)) { return 'values: array expected' }
        for (var i = 0; i < message.values.length; ++i) {
          if (!$util.isString(message.values[i])) { return 'values: string[] expected' }
        }
      }
      return null
    }

    /**
         * Creates a LabelResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof logproto.LabelResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.LabelResponse} LabelResponse
         */
    LabelResponse.fromObject = function fromObject (object) {
      if (object instanceof $root.logproto.LabelResponse) { return object }
      var message = new $root.logproto.LabelResponse()
      if (object.values) {
        if (!Array.isArray(object.values)) { throw TypeError('.logproto.LabelResponse.values: array expected') }
        message.values = []
        for (var i = 0; i < object.values.length; ++i) { message.values[i] = String(object.values[i]) }
      }
      return message
    }

    /**
         * Creates a plain object from a LabelResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof logproto.LabelResponse
         * @static
         * @param {logproto.LabelResponse} message LabelResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
    LabelResponse.toObject = function toObject (message, options) {
      if (!options) { options = {} }
      var object = {}
      if (options.arrays || options.defaults) { object.values = [] }
      if (message.values && message.values.length) {
        object.values = []
        for (var j = 0; j < message.values.length; ++j) { object.values[j] = message.values[j] }
      }
      return object
    }

    /**
         * Converts this LabelResponse to JSON.
         * @function toJSON
         * @memberof logproto.LabelResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
    LabelResponse.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    return LabelResponse
  })()

  logproto.Stream = (function () {
    /**
         * Properties of a Stream.
         * @memberof logproto
         * @interface IStream
         * @property {string|null} [labels] Stream labels
         * @property {Array.<logproto.IEntry>|null} [entries] Stream entries
         */

    /**
         * Constructs a new Stream.
         * @memberof logproto
         * @classdesc Represents a Stream.
         * @implements IStream
         * @constructor
         * @param {logproto.IStream=} [properties] Properties to set
         */
    function Stream (properties) {
      this.entries = []
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
         * Stream labels.
         * @member {string} labels
         * @memberof logproto.Stream
         * @instance
         */
    Stream.prototype.labels = ''

    /**
         * Stream entries.
         * @member {Array.<logproto.IEntry>} entries
         * @memberof logproto.Stream
         * @instance
         */
    Stream.prototype.entries = $util.emptyArray

    /**
         * Creates a new Stream instance using the specified properties.
         * @function create
         * @memberof logproto.Stream
         * @static
         * @param {logproto.IStream=} [properties] Properties to set
         * @returns {logproto.Stream} Stream instance
         */
    Stream.create = function create (properties) {
      return new Stream(properties)
    }

    /**
         * Encodes the specified Stream message. Does not implicitly {@link logproto.Stream.verify|verify} messages.
         * @function encode
         * @memberof logproto.Stream
         * @static
         * @param {logproto.IStream} message Stream message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    Stream.encode = function encode (message, writer) {
      if (!writer) { writer = $Writer.create() }
      if (message.labels != null && message.hasOwnProperty('labels')) { writer.uint32(/* id 1, wireType 2 = */10).string(message.labels) }
      if (message.entries != null && message.entries.length) {
        for (var i = 0; i < message.entries.length; ++i) { $root.logproto.Entry.encode(message.entries[i], writer.uint32(/* id 2, wireType 2 = */18).fork()).ldelim() }
      }
      return writer
    }

    /**
         * Encodes the specified Stream message, length delimited. Does not implicitly {@link logproto.Stream.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.Stream
         * @static
         * @param {logproto.IStream} message Stream message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    Stream.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
         * Decodes a Stream message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.Stream
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.Stream} Stream
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    Stream.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.logproto.Stream()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1:
            message.labels = reader.string()
            break
          case 2:
            if (!(message.entries && message.entries.length)) { message.entries = [] }
            message.entries.push($root.logproto.Entry.decode(reader, reader.uint32()))
            break
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
         * Decodes a Stream message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof logproto.Stream
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.Stream} Stream
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    Stream.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
         * Verifies a Stream message.
         * @function verify
         * @memberof logproto.Stream
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
    Stream.verify = function verify (message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      if (message.labels != null && message.hasOwnProperty('labels')) {
        if (!$util.isString(message.labels)) { return 'labels: string expected' }
      }
      if (message.entries != null && message.hasOwnProperty('entries')) {
        if (!Array.isArray(message.entries)) { return 'entries: array expected' }
        for (var i = 0; i < message.entries.length; ++i) {
          var error = $root.logproto.Entry.verify(message.entries[i])
          if (error) { return 'entries.' + error }
        }
      }
      return null
    }

    /**
         * Creates a Stream message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof logproto.Stream
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.Stream} Stream
         */
    Stream.fromObject = function fromObject (object) {
      if (object instanceof $root.logproto.Stream) { return object }
      var message = new $root.logproto.Stream()
      if (object.labels != null) { message.labels = String(object.labels) }
      if (object.entries) {
        if (!Array.isArray(object.entries)) { throw TypeError('.logproto.Stream.entries: array expected') }
        message.entries = []
        for (var i = 0; i < object.entries.length; ++i) {
          if (typeof object.entries[i] !== 'object') { throw TypeError('.logproto.Stream.entries: object expected') }
          message.entries[i] = $root.logproto.Entry.fromObject(object.entries[i])
        }
      }
      return message
    }

    /**
         * Creates a plain object from a Stream message. Also converts values to other types if specified.
         * @function toObject
         * @memberof logproto.Stream
         * @static
         * @param {logproto.Stream} message Stream
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
    Stream.toObject = function toObject (message, options) {
      if (!options) { options = {} }
      var object = {}
      if (options.arrays || options.defaults) { object.entries = [] }
      if (options.defaults) { object.labels = '' }
      if (message.labels != null && message.hasOwnProperty('labels')) { object.labels = message.labels }
      if (message.entries && message.entries.length) {
        object.entries = []
        for (var j = 0; j < message.entries.length; ++j) { object.entries[j] = $root.logproto.Entry.toObject(message.entries[j], options) }
      }
      return object
    }

    /**
         * Converts this Stream to JSON.
         * @function toJSON
         * @memberof logproto.Stream
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
    Stream.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    return Stream
  })()

  logproto.Entry = (function () {
    /**
         * Properties of an Entry.
         * @memberof logproto
         * @interface IEntry
         * @property {google.protobuf.ITimestamp|null} [timestamp] Entry timestamp
         * @property {string|null} [line] Entry line
         */

    /**
         * Constructs a new Entry.
         * @memberof logproto
         * @classdesc Represents an Entry.
         * @implements IEntry
         * @constructor
         * @param {logproto.IEntry=} [properties] Properties to set
         */
    function Entry (properties) {
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
         * Entry timestamp.
         * @member {google.protobuf.ITimestamp|null|undefined} timestamp
         * @memberof logproto.Entry
         * @instance
         */
    Entry.prototype.timestamp = null

    /**
         * Entry line.
         * @member {string} line
         * @memberof logproto.Entry
         * @instance
         */
    Entry.prototype.line = ''

    /**
         * Creates a new Entry instance using the specified properties.
         * @function create
         * @memberof logproto.Entry
         * @static
         * @param {logproto.IEntry=} [properties] Properties to set
         * @returns {logproto.Entry} Entry instance
         */
    Entry.create = function create (properties) {
      return new Entry(properties)
    }

    /**
         * Encodes the specified Entry message. Does not implicitly {@link logproto.Entry.verify|verify} messages.
         * @function encode
         * @memberof logproto.Entry
         * @static
         * @param {logproto.IEntry} message Entry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    Entry.encode = function encode (message, writer) {
      if (!writer) { writer = $Writer.create() }
      if (message.timestamp != null && message.hasOwnProperty('timestamp')) { $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim() }
      if (message.line != null && message.hasOwnProperty('line')) { writer.uint32(/* id 2, wireType 2 = */18).string(message.line) }
      return writer
    }

    /**
         * Encodes the specified Entry message, length delimited. Does not implicitly {@link logproto.Entry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.Entry
         * @static
         * @param {logproto.IEntry} message Entry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
    Entry.encodeDelimited = function encodeDelimited (message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
         * Decodes an Entry message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.Entry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.Entry} Entry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    Entry.decode = function decode (reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.logproto.Entry()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1:
            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32())
            break
          case 2:
            message.line = reader.string()
            break
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
         * Decodes an Entry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof logproto.Entry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.Entry} Entry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    Entry.decodeDelimited = function decodeDelimited (reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
         * Verifies an Entry message.
         * @function verify
         * @memberof logproto.Entry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
    Entry.verify = function verify (message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      if (message.timestamp != null && message.hasOwnProperty('timestamp')) {
        var error = $root.google.protobuf.Timestamp.verify(message.timestamp)
        if (error) { return 'timestamp.' + error }
      }
      if (message.line != null && message.hasOwnProperty('line')) {
        if (!$util.isString(message.line)) { return 'line: string expected' }
      }
      return null
    }

    /**
         * Creates an Entry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof logproto.Entry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.Entry} Entry
         */
    Entry.fromObject = function fromObject (object) {
      if (object instanceof $root.logproto.Entry) { return object }
      var message = new $root.logproto.Entry()
      if (object.timestamp != null) {
        if (typeof object.timestamp !== 'object') { throw TypeError('.logproto.Entry.timestamp: object expected') }
        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp)
      }
      if (object.line != null) { message.line = String(object.line) }
      return message
    }

    /**
         * Creates a plain object from an Entry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof logproto.Entry
         * @static
         * @param {logproto.Entry} message Entry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
    Entry.toObject = function toObject (message, options) {
      if (!options) { options = {} }
      var object = {}
      if (options.defaults) {
        object.timestamp = null
        object.line = ''
      }
      if (message.timestamp != null && message.hasOwnProperty('timestamp')) { object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options) }
      if (message.line != null && message.hasOwnProperty('line')) { object.line = message.line }
      return object
    }

    /**
         * Converts this Entry to JSON.
         * @function toJSON
         * @memberof logproto.Entry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
    Entry.prototype.toJSON = function toJSON () {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    return Entry
  })()

  return logproto
})()

$root.google = (function () {
  /**
     * Namespace google.
     * @exports google
     * @namespace
     */
  var google = {}

  google.protobuf = (function () {
    /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
    var protobuf = {}

    protobuf.Timestamp = (function () {
      /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

      /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
      function Timestamp (properties) {
        if (properties) {
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
          }
        }
      }

      /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
      Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0, 0, false) : 0

      /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
      Timestamp.prototype.nanos = 0

      /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
      Timestamp.create = function create (properties) {
        return new Timestamp(properties)
      }

      /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
      Timestamp.encode = function encode (message, writer) {
        if (!writer) { writer = $Writer.create() }
        if (message.seconds != null && message.hasOwnProperty('seconds')) { writer.uint32(/* id 1, wireType 0 = */8).int64(message.seconds) }
        if (message.nanos != null && message.hasOwnProperty('nanos')) { writer.uint32(/* id 2, wireType 0 = */16).int32(message.nanos) }
        return writer
      }

      /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
      Timestamp.encodeDelimited = function encodeDelimited (message, writer) {
        return this.encode(message, writer).ldelim()
      }

      /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      Timestamp.decode = function decode (reader, length) {
        if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
        var end = length === undefined ? reader.len : reader.pos + length; var message = new $root.google.protobuf.Timestamp()
        while (reader.pos < end) {
          var tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.seconds = reader.int64()
              break
            case 2:
              message.nanos = reader.int32()
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      Timestamp.decodeDelimited = function decodeDelimited (reader) {
        if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
        return this.decode(reader, reader.uint32())
      }

      /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
      Timestamp.verify = function verify (message) {
        if (typeof message !== 'object' || message === null) { return 'object expected' }
        if (message.seconds != null && message.hasOwnProperty('seconds')) {
          if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high))) { return 'seconds: integer|Long expected' }
        }
        if (message.nanos != null && message.hasOwnProperty('nanos')) {
          if (!$util.isInteger(message.nanos)) { return 'nanos: integer expected' }
        }
        return null
      }

      /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
      Timestamp.fromObject = function fromObject (object) {
        if (object instanceof $root.google.protobuf.Timestamp) { return object }
        var message = new $root.google.protobuf.Timestamp()
        if (object.seconds != null) {
          if ($util.Long) { (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false } else if (typeof object.seconds === 'string') { message.seconds = parseInt(object.seconds, 10) } else if (typeof object.seconds === 'number') { message.seconds = object.seconds } else if (typeof object.seconds === 'object') { message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber() }
        }
        if (object.nanos != null) { message.nanos = object.nanos | 0 }
        return message
      }

      /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
      Timestamp.toObject = function toObject (message, options) {
        if (!options) { options = {} }
        var object = {}
        if (options.defaults) {
          if ($util.Long) {
            var long = new $util.Long(0, 0, false)
            object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long
          } else { object.seconds = options.longs === String ? '0' : 0 }
          object.nanos = 0
        }
        if (message.seconds != null && message.hasOwnProperty('seconds')) {
          if (typeof message.seconds === 'number') { object.seconds = options.longs === String ? String(message.seconds) : message.seconds } else { object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds }
        }
        if (message.nanos != null && message.hasOwnProperty('nanos')) { object.nanos = message.nanos }
        return object
      }

      /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
      Timestamp.prototype.toJSON = function toJSON () {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
      }

      return Timestamp
    })()

    return protobuf
  })()

  return google
})()

module.exports = $root
