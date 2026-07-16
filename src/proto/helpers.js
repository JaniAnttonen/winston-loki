// Loki's push API only accepts string values in structured metadata
const toStringValues = rest =>
  Object.fromEntries(
    Object.entries(rest ?? {}).map(([key, value]) => [
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    ])
  )

module.exports = {
  createProtoTimestamps: logEntry => {
    if (logEntry && logEntry.entries && logEntry.entries.length > 0) {
      logEntry.entries = logEntry.entries.map(entry => {
        return {
          timestamp: {
            seconds: Math.floor(entry.ts / 1000),
            nanos: (entry.ts % 1000) * 1000000
          },
          line: entry.line
        }
      })
    }
    return logEntry
  },
  prepareJSONBatch: batch => {
    const streams = batch.streams.map(logStream => ({
      stream: logStream.labels,
      // Convert milliseconds to nanoseconds in string space, as the
      // multiplied value exceeds Number.MAX_SAFE_INTEGER
      values: logStream.entries.map(entry => [Math.floor(entry.ts) + '000000', entry.line, toStringValues(entry.rest)])
    }))
    return { streams }
  },
  prepareProtoBatch: batch => {
    batch.streams = batch.streams.map(logEntry => {
      // Skip preparation when the batch has been prepared already
      // TODO: The patch blocks new labels to be added, although the situation is better than before
      if (typeof logEntry.labels === 'string') {
        return logEntry
      }
      let protoLabels = `{level="${logEntry.labels.level}"`
      delete logEntry.labels.level
      for (const key in logEntry.labels) {
        protoLabels += `,${key}="${logEntry.labels[key]}"`
      }
      protoLabels += '}'
      logEntry.labels = protoLabels
      return logEntry
    })
    return batch
  }
}
