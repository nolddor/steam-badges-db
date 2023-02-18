const path = require('path')
const fs = require('fs')
const JSONStorage = require('../JSONStorage')

describe('JSONStorage#save()', function() {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Save minified badges successfully', async () => {
        const filename = 'badges.json'
        const dir = path.resolve(__dirname, '../__tests__/mocks')
        const spy = jest.spyOn(JSONStorage, 'save')
        const badges = JSONStorage.load(dir, filename)
        const filePath = path.join(dir, filename)

        fs.rmSync(filePath)

        JSONStorage.save(dir, filename, badges)

        const storedBadges = JSONStorage.load(dir, filename)

        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(dir, filename, badges)
        expect(storedBadges).toStrictEqual(badges)
    })

    test('Save badges successfully', async () => {
        const filename = 'badges.json'
        const dir = path.resolve(__dirname, '../__tests__/mocks')
        const spy = jest.spyOn(JSONStorage, 'save')
        const badges = JSONStorage.load(dir, filename)
        const options = { minify: false }
        const filePath = path.join(dir, filename)

        fs.rmSync(filePath)

        JSONStorage.save(dir, filename, badges, options)

        const storedBadges = JSONStorage.load(dir, filename)

        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(dir, filename, badges, options)
        expect(storedBadges).toStrictEqual(badges)
    })
})

describe('JSONStorage#load()', function() {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Load badges successfully', async () => {
        const filename = 'badges.json'
        const dir = path.resolve(__dirname, '../__tests__/mocks')
        const filePath = path.join(dir, filename)
        const spy = jest.spyOn(JSONStorage, 'load')
        const badges = JSONStorage.load(dir, filename)
        const badgesMock = fs.readFileSync(filePath, {
            encoding: 'utf8',
            flag: 'r'
        })

        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(dir, filename)
        expect(badges).toStrictEqual(JSON.parse(badgesMock))
    })

    test('Throws "File Not Found" error', () => {
        try {
            const filename = 'unknown.json'
            const dir = path.resolve(__dirname, '../__tests__/mocks')
            const spy = jest.spyOn(JSONStorage, 'load')

            JSONStorage.load(dir, filename)

            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(dir, filename)
        } catch (error) {
            expect(error.message).toBe('File Not Found')
        }
    })
})
