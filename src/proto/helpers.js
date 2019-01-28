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
  },
  sortBatch: batch => {
    if (
      batch.streams[0] &&
      batch.streams[0].entries &&
      batch.streams[0].entries.find(
        entry => entry.timestamp && entry.timestamp.seconds
      )
    ) {
      batch.streams = batch.streams.map(stream => {
        stream.entries = stream.entries.sort(
          (a, b) => a.timestamp.seconds - b.timestamp.seconds
        )
        return stream
      })
    } else {
      batch.streams = batch.streams.sort(
        (a, b) => a.entries[0].ts - b.entries[0].ts
      )
    }
    return batch
  }
}
