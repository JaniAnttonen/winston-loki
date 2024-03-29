# winston-loki

[![npm version](https://badge.fury.io/js/winston-loki.svg)](https://badge.fury.io/js/winston-loki)
[![install size](https://packagephobia.now.sh/badge?p=winston-loki)](https://packagephobia.now.sh/result?p=winston-loki)
[![Build Status](https://travis-ci.com/JaniAnttonen/winston-loki.svg?branch=master)](https://travis-ci.com/JaniAnttonen/winston-loki)
[![Coverage Status](https://coveralls.io/repos/github/JaniAnttonen/winston-loki/badge.svg?branch=master)](https://coveralls.io/github/JaniAnttonen/winston-loki?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/17a55cce14d581c308bc/maintainability)](https://codeclimate.com/github/JaniAnttonen/winston-loki/maintainability)

A Grafana Loki transport for the nodejs logging library Winston.

## Usage
This Winston transport is used similarly to other Winston transports. Require winston and define a new LokiTransport() inside its options when creating it.

### [Examples](./examples/)
Several usage examples with a test configuration for Grafana+Loki+Promtail reside under [`examples/`](./examples/). If you want the simplest possible configuration, that's probably the place to check out. By defining `json: true` and giving `winston-loki` the correct `host` address for Loki is enough for most.

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
| `labels`           | custom labels, key-value pairs                            | { module: 'http' }     | undefined     |
| `format`           | winston format (https://github.com/winstonjs/winston#formats) | simple()           | undefined     |
| `gracefulShutdown` | Enable/disable graceful shutdown (wait for any unsent batches) | false             | true          |
| `timeout`          | timeout for requests to grafana loki in ms                | 30000                  | undefined     | 
| `basicAuth`        | basic authentication credentials to access Loki over HTTP | username:password      | undefined     | 
| `onConnectionError`| Loki error connection handler                        | (err) => console.error(err) | undefined     | 

### Using with Next.js and Webpack
`winston-loki` can be seamlessly integrated with Next.js and Webpack-based projects. The library attempts to load `snappy` for enhanced performance. However, in scenarios where `snappy` cannot be loaded, such as certain Webpack configurations that do not support `.node` files, `winston-loki` will automatically fall back to using JSON transport. This ensures compatibility across different environments without requiring additional configuration.

For most users, no extra steps will be necessary to use `winston-loki` with Next.js and Webpack. However, if you encounter issues related to loading `.node` files, please ensure that your Webpack version and configuration are set up to support such files. Alternatively, consider using `winston-loki` in environments where native addons are supported, to leverage the full capabilities of the library.

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

Refer to https://grafana.com/docs/loki/latest/api/ for documentation about the available endpoints, data formats etc.

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
