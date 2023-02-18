const SteamCardExchange = require('./lib/SteamCardExchange')
const AppDir = require('./lib/AppDir')
const JSONStorage = require('./lib/JSONStorage')
const Logger = require('./lib/Logger')

async function main() {
    const dir = AppDir.data()
    const file = 'badges.json'
    const compressed = 'badges.min.json'

    Logger.info('Connecting to SteamCardExchange...')
    const sce = await SteamCardExchange.getBadges()
    const cache = JSONStorage.load(dir, file)
    const badges = { ...cache, ...sce }

    const count = Object.keys(badges).length
    Logger.info(`Found ${count} Steam apps having trading cards.`)

    JSONStorage.save(dir, file, badges, { minify: false })
    JSONStorage.save(dir, compressed, badges)
}

main()
