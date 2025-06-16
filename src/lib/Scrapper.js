const { decode } = require('html-entities')
const { getJSON } = require('./HTTPClient')

class Scrapper {
  static async getBadges () {
    const endpoint = 'https://www.steamcardexchange.net/api/request.php?GetInventory'
    const data = await getJSON(endpoint).then(json => json.data)

    if (!data) {
      throw new Error('Malformed response')
    }

    return data.reduce((badges, current) => {
      const appid = current[0][0]
      const name = decode(current[0][1])
      const size = current[3][0]

      if (size) {
        badges[appid] = { name, size }
      }

      return badges
    }, {})
  }
}

module.exports = Scrapper
