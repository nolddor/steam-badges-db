const SteamCardExchange = require('../SteamCardExchange')
const { getJSON } = require('../HTTPClient')

jest.mock('../HTTPClient')

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

const mockGetJSON = async badges => {
    if (badges) {
        return { data: Object.entries(badges).map(([appid, badge]) => [[appid, badge.name], null, null, [badge.size]]) }
    }
    return {}
}

describe('SteamCardExchange#getBadges()', () => {
    test('Throws "Malformed Response" error', () => {
        const badges = null
        getJSON.mockImplementationOnce(() => mockGetJSON(badges))
        expect(SteamCardExchange.getBadges()).rejects.toThrowError('Malformed response')
    })

    test('Get badges successfully', () => {
        const badges = { ...badgeA, ...badgeB }
        getJSON.mockImplementationOnce(() => mockGetJSON(badges))
        expect(SteamCardExchange.getBadges()).resolves.toStrictEqual(badges)
    })

    test('Skip 0-size badges', () => {
        const badges = { ...badgeA, ...badgeC }
        getJSON.mockImplementationOnce(() => mockGetJSON(badges))
        expect(SteamCardExchange.getBadges()).resolves.toStrictEqual(badgeA)
    })
})

// Runs after every the tests in this file, once per test.
afterEach(() => {
    jest.resetAllMocks()
})
