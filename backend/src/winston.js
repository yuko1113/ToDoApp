const winston = require('winston');
const format = winston.format;

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tokyo'
    });
}

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: timezoned }),
        format.cli(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'winston.log', level: 'debug' })
    ]
});

module.exports = logger;

// logger.debug('Debug Message');
// logger.info('Info Message');
// logger.warn('Warn Message');
// logger.error('Error Message');