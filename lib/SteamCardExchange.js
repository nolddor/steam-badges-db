const HTMLUtils = require('./HTMLUtils')
const axios = require('axios')


class SteamCardExchange {

    static getBadges() {
        return axios.get('https://www.steamcardexchange.net/api/request.php?GetInventory').then(res =>
            res.data.data.reduce((badges, current) => {
                let appid = current[0][0]
                let name = current[0][1]
                let size = current[3][0]

                if (!!size) {
                    badges[appid] = {
                        "name": HTMLUtils.decode(name),
                        "size": size
                    }
                }

                return badges
            }, {}))
    }
}


module.exports = SteamCardExchange
