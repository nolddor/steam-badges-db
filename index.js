const SteamCardExchange = require('./lib/SteamCardExchange')
const AppDir = require('./lib/AppDir')
const JSONStorage = require('./lib/JSONStorage')
const Logger = require('./lib/Logger')

Logger.info('Connecting to SteamCardExchange...')
SteamCardExchange.getBadges().then(badges => {
    const count = Object.keys(badges).length
    Logger.info(`Found ${count} Steam apps having trading cards.`)
    JSONStorage.store(AppDir.data(), 'badges.json', badges, { minify: false })
    JSONStorage.store(AppDir.data(), 'badges.min.json', badges)
})
