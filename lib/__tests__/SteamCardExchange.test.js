const SteamCardExchange = require('../SteamCardExchange')
const axios = require('axios')

jest.mock('axios')

beforeEach(() => {
    jest.resetAllMocks()
})

const badgeA = {
    112233: {
        name: 'Game-A',
        size: 15
    }
}
const badgeB = {
    445566: {
        name: 'Game-B',
        size: 5
    }
}
const badgeC = {
    778899: {
        name: 'Game-C',
        size: 0
    }
}

describe('SteamCardExchange#getBadges()', function() {
    test('Throws "Malformed Response" error', async () => {
        axios.get.mockResolvedValue({ data: {} })
        await expect(SteamCardExchange.getBadges).rejects.toThrowError('Malformed response')
    })

    test('Get badges successfully', async () => {
        const badges = { ...badgeA, ...badgeB }
        axios.get.mockResolvedValue({
            data: {
                data: Object.entries(badges).map(([appid, badge]) => [[appid, badge.name], null, null, [badge.size]])
            }
        })
        const result = await SteamCardExchange.getBadges()
        expect(result).toStrictEqual(badges)
    })

    test('Skip 0-size badges', async () => {
        const badges = { ...badgeA, ...badgeC }
        axios.get.mockResolvedValue({
            data: {
                data: Object.entries(badges).map(([appid, badge]) => [[appid, badge.name], null, null, [badge.size]])
            }
        })
        const result = await SteamCardExchange.getBadges()
        expect(result).toStrictEqual(badgeA)
    })
})
