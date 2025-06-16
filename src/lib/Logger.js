const { createLogger, format, transports } = require('winston')

const { timestamp, printf, colorize } = format

const timestampFormat = timestamp({
  format: 'YYYY-MM-DD HH:mm:ss'
})

const printfFormat = printf(info => {
  return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`
})

const colorizeFormat = colorize({
  all: true
})

const consoleTransport = new transports.Console()

module.exports = createLogger({
  level: 'debug',
  format: format.combine(timestampFormat, printfFormat, colorizeFormat),
  transports: [consoleTransport]
})
