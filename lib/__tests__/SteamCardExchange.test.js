const SteamCardExchange = require('../SteamCardExchange')
const axios = require('axios')

jest.mock('axios')

describe('SteamCardExchange#getBadges()', function() {
    test('Throws "Malformed Response" error', async () => {
        axios.get.mockResolvedValue({ data: {} })
        await expect(SteamCardExchange.getBadges).rejects.toThrowError('Malformed response')
    })
})
