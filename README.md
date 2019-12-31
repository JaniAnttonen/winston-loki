# winston-loki
[![npm version](https://badge.fury.io/js/winston-loki.svg)](https://badge.fury.io/js/winston-loki)
[![Build Status](https://travis-ci.com/JaniAnttonen/winston-loki.svg?branch=master)](https://travis-ci.com/JaniAnttonen/winston-loki)
[![Coverage Status](https://coveralls.io/repos/github/JaniAnttonen/winston-loki/badge.svg?branch=master)](https://coveralls.io/github/JaniAnttonen/winston-loki?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


A Grafana Loki transport for the nodejs logging library Winston.
__Tested to work with Grafana Loki v1.0.0__

*NOTE: Latest version only guaranteed to work with the latest version of Grafana Loki. Make sure to update Loki if you have updated this package*

## Usage
This Winston transport is used similarly to other Winston transports. Require winston and define a new LokiTransport() inside its options when creating it.

### Options
LokiTransport() takes a Javascript object as an input. These are the options that are available, __required in bold__:

| **Parameter**      | **Description**                                           | **Example**            | **Default**   |
| ------------------ | --------------------------------------------------------- | -----------------------| ------------- |
| __`host`__         | URL for Grafana Loki                                      | http://localhost:3100  | null          |
| `interval`         | The interval at which batched logs are sent in seconds    | 30                     | 5             |
| `json`             | Use JSON instead of Protobuf for transport                | true                   | false         |
| `batching`         | If batching is not used, the logs are sent as they come   | true                   | true          |
| `clearOnError`     | Discard any logs that result in an error during transport | true                   | false         |
| `replaceTimestamp` | Replace any log timestamps with Date.now()                | true                   | false         |
| `labels`           | custom labels, key-value pairs                            | { module: 'http' }     | null          |
| `format`           | winston format (https://github.com/winstonjs/winston#formats) | simple()           | null          |

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

Running a local Loki for testing is probably required, and the easiest way to do that is to follow this guide: https://github.com/grafana/loki/tree/master/production#run-locally-using-docker. After that, Grafana Loki instance is available at `http://localhost:3100`, with a Grafana instance running at `http://localhost:3000`. Username `admin`, password `admin`.

Refer to https://github.com/grafana/loki/blob/master/docs/api.md for documentation about the available endpoints, data formats etc.

### Run tests
```sh
npm test
```

Write new ones under `/test`

TODO: Remove *got* dependency
