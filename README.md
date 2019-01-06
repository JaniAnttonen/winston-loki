# winston-loki
A Grafana Loki transport for the nodejs logging library Winston.
## Usage
```javascript
const LokiTransport = require("winston-loki");
const options = {
  format: format.combine(
    format.label({ label: name }),
    format.timestamp(),
    format.json()
  ),
  transports: [
    new LokiTransport({
      level: level,
      host: "http://localhost:3100"
    })
  ],
  exitOnError: false
};

const logger = createLogger(options);
```

## Developing
```bash
npm install
npm link
cd ~/your_project
npm link winston-loki
npm install
```
And you should have a working, requirable winston-loki package under your project's node_modules.

TODO: Add protobuf as default mode, tests
