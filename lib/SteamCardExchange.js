const HTMLUtils = require('./HTMLUtils')
const axios = require('axios')

class SteamCardExchange {
    static async getBadges() {
        const response = await axios.get('https://www.steamcardexchange.net/api/request.php?GetInventory')
        const data = response.data.data

        if (!data) {
            throw new Error('Malformed response')
        }

        return data.reduce((badges, current) => {
            const appid = current[0][0]
            const name = HTMLUtils.decode(current[0][1])
            const size = current[3][0]

            if (size) {
                badges[appid] = { name, size }
            }

            return badges
        }, {})
    }
}

module.exports = SteamCardExchange
