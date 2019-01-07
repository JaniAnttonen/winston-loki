# winston-loki
A Grafana Loki transport for the nodejs logging library Winston.

*NOTE: Use with caution, very alpha very logging wow*

## Usage
This Winston transport is used similarly to other Winston transports. Require winston and define a new LokiTransport() inside its options when creating it.

### Options
LokiTransport() takes a Javascript object as an input. These are the options that are available:

>`host`

The URL of the Grafana Loki server.
It should contain everything from the protocol to the port.

>`interval`

The interval at which the transport sends batched logs to Loki.

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


TODO: Add protobuf as default mode, tests, *got* dependency
