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
  sortBatch: (batch, replace) => {
    let max

    if (
      batch.streams[0] &&
      batch.streams[0].entries &&
      batch.streams[0].entries.find(
        entry => entry.timestamp && entry.timestamp.seconds
      )
    ) {
      max = {
        seconds: 0,
        nanos: 0
      }

      batch.streams = batch.streams.map(stream => {
        if (replace) {
          stream.entries = stream.entries.map(entry => {
            const dt = moment(Date.now()).valueOf()
            entry.timestamp = {
              seconds: Math.floor(dt / 1000),
              nanos: (dt % 1000) * 1000
            }
            return entry
          })
        }
        // Sort the entries first by seconds and then by nanoseconds
        stream.entries = stream.entries.sort(
          (a, b) =>
            a.timestamp.seconds - b.timestamp.seconds ||
            a.timestamp.nanos - b.timestamp.nanos
        )

        // Then ensure that there's no duplicate entries by nanosecond
        stream.entries = stream.entries.map(entry => {
          const { seconds, nanos } = entry.timestamp

          if (max.seconds === seconds && max.nanos === nanos) {
            if (nanos === 999999) {
              entry.timestamp.nanos = 0
              entry.timestamp.seconds++
            } else {
              entry.timestamp.nanos++
            }
          } else if (max.seconds === seconds && max.nanos > nanos) {
            entry.timestamp = JSON.parse(JSON.stringify(max))
            entry.timestamp.nanos++
          }

          max = JSON.parse(JSON.stringify(entry.timestamp))

          return entry
        })

        return stream
      })
    } else {
      max = 0

      batch.streams = batch.streams.map(stream => {
        if (replace) {
          stream.entries = stream.entries.map(entry => {
            entry.ts = Date.now()
            return entry
          })
        }

        // Sort the entries
        stream.entries = stream.entries.sort((a, b) => a.ts - b.ts)

        // Then ensure that there's no duplicate entries by nanosecond
        stream.entries = stream.entries.map(entry => {
          if (max === entry.ts) {
            entry.ts++
          } else if (max > entry.ts) {
            entry.ts = max
            entry.ts++
          }
          max = entry.ts
          return entry
        })

        return stream
      })
    }
    return batch
  }
}
