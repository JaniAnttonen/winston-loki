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
    let maxValue = 0
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
        stream.entries = stream.entries.map(entry => {
          const currValue = Number(
            String(entry.timestamp.seconds).concat(
              String(entry.timestamp.nanos / 1000)
            )
          )
          if (maxValue === 0 || maxValue < currValue) {
            maxValue = currValue
          } else {
            entry.timestamp = {
              seconds: Math.floor(maxValue / 1000),
              nanos: (maxValue % 1000) * 1000 + 1
            }
            maxValue = Number(
              String(entry.timestamp.seconds).concat(
                String(entry.timestamp.nanos / 1000)
              )
            )
          }
          return entry
        })
        return stream
      })
    } else {
      batch.streams = batch.streams.sort(
        (a, b) => a.entries[0].ts - b.entries[0].ts
      )
      batch.streams = batch.streams.map(stream => {
        if (maxValue === 0 || maxValue < stream.entries[0].ts) {
          maxValue = stream.entries[0].ts
        } else {
          stream.entries[0].ts = maxValue + 1
          maxValue = stream.entries[0].ts
        }
        return stream
      })
    }
    return batch
  }
}
