const JSONStorage = require('../JSONStorage')
const fs = require('fs')

jest.mock('fs')

beforeEach(() => {
    jest.resetAllMocks()
})

describe('JSONStorage#load()', function() {
    test('Throw "File Not Found" error', () => {
        fs.existsSync.mockReturnValue(false)
        const load = () => JSONStorage.load('folder', 'file.json')
        expect(load).toThrowError('File Not Found')
    })

    test('Load json file successfully', async () => {
        const json = { key: 'value' }
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify(json))
        const load = () => JSONStorage.load('folder', 'file.json')
        expect(load()).toStrictEqual(json)
    })
})
