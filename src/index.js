const Scrapper = require('./lib/Scrapper')
const JSONStorage = require('./lib/JSONStorage')
const Logger = require('./lib/Logger')
const EFolders = require('./enum/EFolders')
const EFiles = require('./enum/EFiles')
const ELocales = require('./enum/ELocales')

async function main () {
  Logger.info('Connecting to remote site...')
  const latest = await Scrapper.getBadges()
  const cache = JSONStorage.readSync(EFolders.DATA, EFiles.BADGES)

  const badges = { ...cache, ...latest }
  const badgesSlim = Object.fromEntries(
    Object.entries(badges).map(([k, v]) => [k, v.size])
  )

  const count = Object.keys(badges).length
  const countAsString = count.toLocaleString(ELocales.en_US)
  Logger.info(`Found ${countAsString} Steam apps having trading cards.`)

  JSONStorage.writeSync(EFolders.DATA, EFiles.BADGES, badges, { minify: false })
  JSONStorage.writeSync(EFolders.DATA, EFiles.BADGES_MIN, badges)
  JSONStorage.writeSync(EFolders.DATA, EFiles.BADGES_SLIM, badgesSlim)
}

main()
