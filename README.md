# winston-loki

[![npm version](https://badge.fury.io/js/winston-loki.svg)](https://badge.fury.io/js/winston-loki)
[![Build Status](https://travis-ci.com/JaniAnttonen/winston-loki.svg?branch=master)](https://travis-ci.com/JaniAnttonen/winston-loki)
[![Coverage Status](https://coveralls.io/repos/github/JaniAnttonen/winston-loki/badge.svg?branch=master)](https://coveralls.io/github/JaniAnttonen/winston-loki?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/17a55cce14d581c308bc/maintainability)](https://codeclimate.com/github/JaniAnttonen/winston-loki/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


A Grafana Loki transport for the nodejs logging library Winston.

## Usage
This Winston transport is used similarly to other Winston transports. Require winston and define a new LokiTransport() inside its options when creating it.

### Options
LokiTransport() takes a Javascript object as an input. These are the options that are available, __required in bold__:

| **Parameter**      | **Description**                                           | **Example**            | **Default**   |
| ------------------ | --------------------------------------------------------- | -----------------------| ------------- |
| __`host`__         | URL for Grafana Loki                                      | http://127.0.0.1:3100  | null          |
| `interval`         | The interval at which batched logs are sent in seconds    | 30                     | 5             |
| `json`             | Use JSON instead of Protobuf for transport                | true                   | false         |
| `batching`         | If batching is not used, the logs are sent as they come   | true                   | true          |
| `clearOnError`     | Discard any logs that result in an error during transport | true                   | false         |
| `replaceTimestamp` | Replace any log timestamps with Date.now()                | true                   | false         |
| `labels`           | custom labels, key-value pairs                            | { module: 'http' }     | null          |
| `format`           | winston format (https://github.com/winstonjs/winston#formats) | simple()           | null          |
| `gracefulShutdown` | Enable/disable graceful shutdown (wait for any unsent batches) | false             | true          |

### Example
With default formatting:
```js
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  ...,
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
  ...
};
const logger = createLogger(options);
```

You can set custom labels in every log as well like this:
```js
logger.debug({ message: 'test', labels: { 'key': 'value' } })
```

TODO: Add custom formatting example

## Developing
### Requirements
Running a local Loki for testing is probably required, and the easiest way to do that is to follow this guide: https://github.com/grafana/loki/tree/master/production#run-locally-using-docker. After that, Grafana Loki instance is available at `http://localhost:3100`, with a Grafana instance running at `http://localhost:3000`. Username `admin`, password `admin`. Add the Loki source with the URL `http://loki:3100`, and the explorer should work.

Refer to https://github.com/grafana/loki/blob/master/docs/api.md for documentation about the available endpoints, data formats etc.

### Example
```sh
npm install
npm link
cd ~/your_project
npm link winston-loki
npm install
```
And you should have a working, requirable winston-loki package under your project's node_modules.
After the link has been established, any changes to winston-loki should show on rerun of the software that uses it.

### Run tests
```sh
npm test
```

Write new ones under `/test`
