const moment = require('moment')
module.exports = {
  createProtoTimestamps: logEntry =>
    logEntry.map(logEntry => {
      logEntry.entries.map(entry => {
        const dt = moment(entry.ts).valueOf()
        return {
          timestamp: {
            seconds: Math.floor(dt / 1000),
            nanos: (dt % 1000) * 1000
          },
          line: entry.line
        }
      })
      return logEntry
    })
}
