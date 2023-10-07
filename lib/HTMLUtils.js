const { decode: htmlEntitiesDecode } = require('html-entities')

class HTMLUtils {
    static decode(str) {
        return htmlEntitiesDecode(str)
    }
}

module.exports = HTMLUtils
