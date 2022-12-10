const winston = require('winston')

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => winston.format.colorize().colorize(info.level, `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`)),
            ),
        }),
    ],
})
