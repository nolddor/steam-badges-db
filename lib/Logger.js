const { createLogger, format, transports } = require('winston')

const console = new transports.Console()

const timestamp = format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
})

const printf = format.printf(info => {
    return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`
})

const colorize = format.printf(info => {
    return format.colorize().colorize(info.level, info[Symbol.for('message')])
})

module.exports = createLogger({
    level: 'debug',
    format: format.combine(timestamp, printf, colorize),
    transports: [console]
})
