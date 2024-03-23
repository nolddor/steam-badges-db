const SteamCardExchange = require('./lib/SteamCardExchange')
const JSONStorage = require('./lib/JSONStorage')
const Logger = require('./lib/Logger')
const EFolders = require('./enum/EFolders')
const EFiles = require('./enum/EFiles')
const ELocales = require('./enum/ELocales')

async function main() {
    Logger.info('Connecting to SteamCardExchange...')
    const sce = await SteamCardExchange.getBadges()
    const cache = JSONStorage.readSync(EFolders.DATA, EFiles.BADGES)
    const badges = { ...cache, ...sce }

    const count = Object.keys(badges).length
    const countAsString = count.toLocaleString(ELocales.en_US)
    Logger.info(`Found ${countAsString} Steam apps having trading cards.`)

    JSONStorage.writeSync(EFolders.DATA, EFiles.BADGES, badges, { minify: false })
    JSONStorage.writeSync(EFolders.DATA, EFiles.BADGES_MIN, badges)
}

main()
