const SteamCardExchange = require('./lib/SteamCardExchange')
const AppDir = require('./lib/AppDir')
const JSONStorage = require('./lib/JSONStorage')

SteamCardExchange.getBadges().then(badges => {
    JSONStorage.store(AppDir.data(), 'badges.json', badges)
})
