const got = require("got");

module.exports = class Batcher {
  constructor(options) {
    this.options = options;
    this.interval = this.options.interval
      ? Number(this.options.interval) * 1000
      : 5000;
    this.circuitBreakerInterval = 60000;
    this.batch = {
      streams: []
    };
  }
  wait(duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }
  pushLogEntry(logEntry) {
    this.batch.streams.push(logEntry);
  }
  clearBatch() {
    this.batch.streams = [];
  }
  sendBatchToLoki() {
    return new Promise((resolve, reject) => {
      if (this.batch.streams.length === 0) {
        resolve();
      } else {
        got
          .post(this.options.host + "/api/prom/push", {
            body: JSON.stringify(this.batch),
            headers: {
              "content-type": "application/json"
            }
          })
          .then(res => {
            this.clearBatch();
            return resolve();
          })
          .catch(err => {
            console.log(err.body);
            return reject(err);
          });
      }
    });
  }
  async run() {
    while (true) {
      try {
        await this.sendBatchToLoki();
        if (this.interval === this.circuitBreakerInterval) {
          this.interval = Number(options.interval) * 1000;
        }
      } catch (e) {
        this.interval = this.circuitBreakerInterval;
      }
      await this.wait(this.interval);
    }
  }
};
