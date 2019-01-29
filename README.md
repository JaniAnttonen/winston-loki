# winston-loki
[![npm version](https://badge.fury.io/js/winston-loki.svg)](https://badge.fury.io/js/winston-loki)
[![Build Status](https://travis-ci.com/JaniAnttonen/winston-loki.svg?branch=master)](https://travis-ci.com/JaniAnttonen/winston-loki)
[![Coverage Status](https://coveralls.io/repos/github/JaniAnttonen/winston-loki/badge.svg?branch=master)](https://coveralls.io/github/JaniAnttonen/winston-loki?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


A Grafana Loki transport for the nodejs logging library Winston.

## Usage
This Winston transport is used similarly to other Winston transports. Require winston and define a new LokiTransport() inside its options when creating it.

### Options
LokiTransport() takes a Javascript object as an input. These are the options that are available, __required in bold__:

| **Parameter**    | **Description**                                           | **Example**                      |
| ---------------- | --------------------------------------------------------- | -------------------------------- |
| __`host`__       | URL for Grafana Loki                                      | http://localhost:3100            |
| `interval`       | The interval at which batched logs are sent in seconds    | 30                               |
| `json`           | Use JSON instead of Protobuf for transport                | true                             |
| `batching`       | If batching is not used, the logs are sent as they come   | true                             |
| `clearOnError`   | Discard any logs that result in an error during transport | true                             |

### Example
```js
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  ...,
  transports: [
    new LokiTransport({
      host: "http://localhost:3100"
    })
  ]
  ...
};
const logger = createLogger(options);
```

## Developing
```sh
npm install
npm link
cd ~/your_project
npm link winston-loki
npm install
```
And you should have a working, requirable winston-loki package under your project's node_modules.

Refer to https://github.com/grafana/loki/blob/master/docs/api.md for documentation about the available endpoints, data formats etc.

Grafana Loki *doesn't have any official releases or version numbers* as of now, so if the API is changed, it's going to be fun, but it's working as of now.

### Run tests
```sh
npm test
```

Write new ones under `/test`

TODO: Remove *got* dependency
