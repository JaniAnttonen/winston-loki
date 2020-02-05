module.exports = {
  createProtoTimestamps: logEntry => {
    if (logEntry && logEntry.entries && logEntry.entries.length > 0) {
      logEntry.entries = logEntry.entries.map(entry => {
        return {
          timestamp: {
            seconds: Math.floor(entry.ts / 1000),
            nanos: (entry.ts % 1000) * 1000
          },
          line: entry.line
        }
      })
    }
    return logEntry
  }
}
