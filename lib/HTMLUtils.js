const htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\''
}

class HTMLUtils {
    // source at https://stackoverflow.com/questions/18749591/encode-html-entities-in-javascript/39243641#39243641
    static decode(str) {
        return str.replace(/&([^;]+);/g, function(entity, entityCode) {
            const match = entityCode.match(/^#(?:x([\da-fA-F]+)|(\d+))$/)

            if (entityCode in htmlEntities) {
                return htmlEntities[entityCode]
            }

            if (match) {
                if (match[1]) {
                    return String.fromCharCode(parseInt(match[1], 16))
                }

                if (match[2]) {
                    return String.fromCharCode(~~match[2])
                }
            }

            return entity
        })
    }
}

module.exports = HTMLUtils
