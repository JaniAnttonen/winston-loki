const winston = require('winston');
const LokiTransport = require('../index');
const logger = winston.createLogger();

logger.add(new winston.transports.Console({
     format: winston.format.json(),
     level: 'debug'
}));

logger.add(new LokiTransport({
     host: "http://127.0.0.1:3100"
}));

logger.info('This is a test, no need to panic')
logger.error('Testing for errors')
