const HTMLUtils = require('../HTMLUtils')

describe('HTMLUtils#decode()', () => {
    test('Entity names decoding', () => {
        expect(HTMLUtils.decode('&amp;')).toBe('&')
        expect(HTMLUtils.decode('&nbsp;')).toBe(' ')
    })

    test('Entity hex numbers decoding', () => {
        expect(HTMLUtils.decode('&#x3c;')).toBe('<')
        expect(HTMLUtils.decode('&#x24;')).toBe('$')
    })

    test('Entity decimal numbers decoding', () => {
        expect(HTMLUtils.decode('&#62;')).toBe('>')
        expect(HTMLUtils.decode('&#8364;')).toBe('€')
    })

    test('Leave decoded entities as is', () => {
        expect(HTMLUtils.decode('®')).toBe('®')
        expect(HTMLUtils.decode('™')).toBe('™')
    })

    test('Leave unkown entities as is', () => {
        expect(HTMLUtils.decode('&foo;')).toBe('&foo;')
        expect(HTMLUtils.decode('&bar;')).toBe('&bar;')
    })

    test('Mixed text decoding', () => {
        expect(HTMLUtils.decode('&#169; 2023 Tommy H. &lt;tommy@mycompany.com&gt;')).toBe('© 2023 Tommy H. <tommy@mycompany.com>')
        expect(HTMLUtils.decode('Sid Meier&#039;s Civilization V')).toBe("Sid Meier's Civilization V")
    })
})
