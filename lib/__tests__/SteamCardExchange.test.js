const SteamCardExchange = require('../SteamCardExchange')
const fetchSpy = jest.spyOn(global, 'fetch')

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

const mockFechSuccess = (badges) => {
    let json = {}
    if (badges) {
        json = { data: Object.entries(badges).map(([appid, badge]) => [[appid, badge.name], null, null, [badge.size]]) }
    }

    return Promise.resolve({
        json: () => Promise.resolve(json), // response content that was provided by the server as json format
        ok: true, // whether the response was successful (status in the range 200-299) or not
        status: 200, // HTTP status code from the server response
        statusText: 'OK' // HTTP status message from the server response
    })
}

const mockFechFailure = () => Promise.resolve({
    json: () => Promise.resolve(), // response content that was provided by the server as json format
    ok: false, // whether the response was successful (status in the range 200-299) or not
    status: 404, // HTTP status code from the server response
    statusText: 'Not Found' // HTTP status message from the server response
})

describe('SteamCardExchange#getBadges()', () => {
    test('Throws "HTTP" error', () => {
        fetchSpy.mockImplementationOnce(() => mockFechFailure())
        expect(SteamCardExchange.getBadges()).rejects.toThrowError('HTTP-404 Not Found')
    })

    test('Throws "Malformed Response" error', () => {
        const badges = null
        fetchSpy.mockImplementationOnce(() => mockFechSuccess(badges))
        expect(SteamCardExchange.getBadges()).rejects.toThrowError('Malformed response')
    })

    test('Get badges successfully', () => {
        const badges = { ...badgeA, ...badgeB }
        fetchSpy.mockImplementationOnce(() => mockFechSuccess(badges))
        expect(SteamCardExchange.getBadges()).resolves.toStrictEqual(badges)
    })

    test('Skip 0-size badges', () => {
        const badges = { ...badgeA, ...badgeC }
        fetchSpy.mockImplementationOnce(() => mockFechSuccess(badges))
        expect(SteamCardExchange.getBadges()).resolves.toStrictEqual(badgeA)
    })
})

// Runs after all the tests in this file have completed.
afterAll(() => {
    fetchSpy.mockRestore()
})
