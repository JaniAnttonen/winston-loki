const moment = require('moment')

module.exports = {
  createProtoTimestamps: logEntry => {
    if (logEntry && logEntry.entries && logEntry.entries.length > 0) {
      logEntry.entries = logEntry.entries.map(entry => {
        const dt = moment(entry.ts).valueOf()
        return {
          timestamp: {
            seconds: Math.floor(dt / 1000),
            nanos: (dt % 1000) * 1000
          },
          line: entry.line
        }
      })
    }
    return logEntry
  }
}
