const Logger = require('../Logger')
const stdMocks = require('std-mocks')

beforeAll(() => {
    jest.useFakeTimers()
})

describe('Logger', () => {
    test('Is defined', () => {
        expect(Logger).not.toBeNull()
        expect(Logger).toBeDefined()

        expect(Logger.debug).toBeInstanceOf(Function)
        expect(Logger.info).toBeInstanceOf(Function)
        expect(Logger.warn).toBeInstanceOf(Function)
        expect(Logger.error).toBeInstanceOf(Function)
    })
})

describe('Logger#info()', () => {
    test('Output with desired format', () => {
        const message = 'Lorem ipsum dolor sit amet'
        const date = '2035-09-07'
        const time = '14:32:45'

        const mockDate = new Date(`${date}T${time}`)
        jest.setSystemTime(mockDate)

        stdMocks.use()
        Logger.info(message)
        stdMocks.restore()

        const [output] = stdMocks.flush().stdout

        expect(output).toContain(`[${date} ${time}] [INFO] ${message}`)
    })
})

afterAll(() => {
    jest.useRealTimers()
})
