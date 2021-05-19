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
    batch.streams = batch.streams.map(logEntry => {
      logEntry.stream = logEntry.labels
      logEntry.values = logEntry.entries
      logEntry.values = logEntry.values.map(entry => {
        return [JSON.stringify(entry.ts * 1000 * 1000), entry.line]
      })
      delete logEntry.entries
      delete logEntry.labels
      return logEntry
    })
    return batch
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
      for (let key in logEntry.labels) {
        protoLabels += `,${key}="${logEntry.labels[key]}"`
      }
      protoLabels += '}'
      logEntry.labels = protoLabels
      return logEntry
    })
    return batch
  }
}
