const HTMLUtils = require('../HTMLUtils')

describe('HTMLUtils#decode()', () => {
    test('Entity names decoding', () => {
        expect(HTMLUtils.decode('&amp;')).toBe('&')
        expect(HTMLUtils.decode('&nbsp;')).toBe(' ')
    })

    test('Entity hex numbers decoding', () => {
        expect(HTMLUtils.decode('&#x3c;')).toBe('<')
        expect(HTMLUtils.decode('&#x24;')).toBe('$')
    })

    test('Entity decimal numbers decoding', () => {
        expect(HTMLUtils.decode('&#62;')).toBe('>')
        expect(HTMLUtils.decode('&#8364;')).toBe('€')
    })

    test('Keep already decoded text untouched', () => {
        expect(HTMLUtils.decode('foo')).toBe('foo')
        expect(HTMLUtils.decode('BAR')).toBe('BAR')
    })
})
