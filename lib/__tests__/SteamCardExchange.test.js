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

describe('SteamCardExchange#getBadges()', () => {
    test('Throws "Malformed Response" error', () => {
        const badges = null
        axios.get.mockImplementation(() => mockAxiosGet(badges))
        expect(SteamCardExchange.getBadges()).rejects.toThrowError('Malformed response')
    })

    test('Get badges successfully', () => {
        const badges = { ...badgeA, ...badgeB }
        axios.get.mockImplementation(() => mockAxiosGet(badges))
        expect(SteamCardExchange.getBadges()).resolves.toStrictEqual(badges)
    })

    test('Skip 0-size badges', () => {
        const badges = { ...badgeA, ...badgeC }
        axios.get.mockImplementation(() => mockAxiosGet(badges))
        expect(SteamCardExchange.getBadges()).resolves.toStrictEqual(badgeA)
    })
})

const mockAxiosGet = (badges) => {
    let body = {}
    if (badges) {
        body = { data: Object.entries(badges).map(([appid, badge]) => [[appid, badge.name], null, null, [badge.size]]) }
    }

    return {
        data: body, // `data` is the response content that was provided by the server
        status: 200, // `status` is the HTTP status code from the server response
        statusText: 'OK' // `statusText` is the HTTP status message from the server response
    }
}
