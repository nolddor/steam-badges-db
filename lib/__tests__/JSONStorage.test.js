const JSONStorage = require('../JSONStorage')
const vol = require('memfs').vol

jest.mock('fs', () => require('memfs').fs)

beforeEach(() => {
    jest.resetAllMocks()
    vol.reset() // Reset in-memory filesystem
})

describe('JSONStorage#load()', function() {
    test('Throw "File Not Found" error', () => {
        const load = () => JSONStorage.load('/foo', 'bar.txt')
        expect(load).toThrowError('File Not Found')
    })

    test('Load json file successfully', () => {
        const data = { key: 'value' }
        vol.fromJSON({
            './file.json': JSON.stringify(data)
        })
        const load = () => JSONStorage.load('.', 'file.json')
        expect(load()).toStrictEqual(data)
    })
})

describe('JSONStorage#save()', function() {
    test('Save json data successfully (compress)', () => {
        const data = { key: 'value' }
        const filename = 'file.min.json'
        const folder = '/folder'

        JSONStorage.save(folder, filename, data)

        const result = vol.toJSON()['/folder/file.min.json']
        const expected = JSON.stringify(data)

        expect(result).toBe(expected)
    })

    test('Save json data successfully (pretty-print)', () => {
        const data = { key: 'value' }
        const filename = 'file.json'
        const folder = '/folder'

        JSONStorage.save(folder, filename, data, { minify: false })

        const result = vol.toJSON()['/folder/file.json']
        const expected = JSON.stringify(data, null, 4)

        expect(result).toBe(expected)
    })
})
