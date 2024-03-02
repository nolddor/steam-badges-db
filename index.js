const SteamCardExchange = require('./lib/SteamCardExchange')
const JSONStorage = require('./lib/JSONStorage')
const Logger = require('./lib/Logger')
const EFolders = require('./enum/EFolders')
const EFiles = require('./enum/EFiles')

async function main() {
    Logger.info('Connecting to SteamCardExchange...')
    const sce = await SteamCardExchange.getBadges()
    const cache = JSONStorage.load(EFolders.DATA, EFiles.BADGES)
    const badges = { ...cache, ...sce }

    const count = Object.keys(badges).length
    Logger.info(`Found ${count.toLocaleString('en-US')} Steam apps having trading cards.`)

    JSONStorage.save(EFolders.DATA, EFiles.BADGES, badges, { minify: false })
    JSONStorage.save(EFolders.DATA, EFiles.BADGES_MIN, badges)
}

main()
