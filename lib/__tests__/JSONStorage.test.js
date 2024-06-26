const JSONStorage = require('../JSONStorage')
const { vol } = require('memfs')

jest.mock('fs', () => require('memfs').fs)

beforeEach(() => {
    jest.resetAllMocks()
    vol.reset() // Reset in-memory filesystem
})

describe('JSONStorage#readSync()', () => {
    test('Throw "File Not Found" error', () => {
        const readSync = () => JSONStorage.readSync('/foo', 'bar.txt')
        expect(readSync).toThrow('File Not Found')
    })

    test('Load json file successfully', () => {
        const data = { key: 'value' }
        vol.fromJSON({
            './file.json': JSON.stringify(data)
        })
        const readSync = () => JSONStorage.readSync('.', 'file.json')
        expect(readSync()).toStrictEqual(data)
    })
})

describe('JSONStorage#writeSync()', () => {
    test('Save json data successfully (compress)', () => {
        const data = { key: 'value' }
        const filename = 'file.min.json'
        const folder = '/folder'

        JSONStorage.writeSync(folder, filename, data)

        const result = vol.toJSON()['/folder/file.min.json']
        const expected = JSON.stringify(data)

        expect(result).toBe(expected)
    })

    test('Save json data successfully (pretty-print)', () => {
        const data = { key: 'value' }
        const filename = 'file.json'
        const folder = '/folder'

        JSONStorage.writeSync(folder, filename, data, { minify: false })

        const result = vol.toJSON()['/folder/file.json']
        const expected = JSON.stringify(data, null, 4)

        expect(result).toBe(expected)
    })
})
