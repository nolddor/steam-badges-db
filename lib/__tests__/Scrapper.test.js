const Scrapper = require('../Scrapper')
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

describe('Scrapper#getBadges()', () => {
  test('Throws "Malformed Response" error', async () => {
    const badges = null
    getJSON.mockImplementationOnce(() => mockGetJSON(badges))
    await expect(Scrapper.getBadges()).rejects.toThrow('Malformed response')
  })

  test('Get badges successfully', async () => {
    const badges = { ...badgeA, ...badgeB }
    getJSON.mockImplementationOnce(() => mockGetJSON(badges))
    await expect(Scrapper.getBadges()).resolves.toStrictEqual(badges)
  })

  test('Skip 0-size badges', async () => {
    const badges = { ...badgeA, ...badgeC }
    getJSON.mockImplementationOnce(() => mockGetJSON(badges))
    await expect(Scrapper.getBadges()).resolves.toStrictEqual(badgeA)
  })
})

// Runs after every the tests in this file, once per test.
afterEach(() => {
  jest.resetAllMocks()
})
