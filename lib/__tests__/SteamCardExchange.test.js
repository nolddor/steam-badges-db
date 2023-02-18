const path = require('path')
const axios = require('axios')

const SteamCardExchange = require('../SteamCardExchange')
const JSONStorage = require('../JSONStorage')

const mockDir = path.resolve(__dirname, '../__tests__/mocks')

jest.mock('axios')

describe('SteamCardExchange#getBadges()', function() {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Throws "Malformed Response" error', async () => {
        axios.get.mockResolvedValue({ data: {} })
        await expect(SteamCardExchange.getBadges).rejects.toThrowError('Malformed response')
    })

    test('Getting badges successfully', async () => {
        const badgesMock = JSONStorage.load(mockDir, 'badges.json')
        const SteamCardExchangeGetInventoryMock = JSONStorage.load(mockDir, 'SteamCardExchangeGetInventory.json')

        axios.get.mockResolvedValue({ data: SteamCardExchangeGetInventoryMock })

        const spy = jest.spyOn(SteamCardExchange, 'getBadges')
        const badges = await SteamCardExchange.getBadges()
        const count = Object.keys(badges).length

        expect(spy).toBeCalledTimes(1)
        expect(count).toBe(Object.keys(badgesMock).length)
        expect(badges).toStrictEqual(badgesMock)
    })
})
