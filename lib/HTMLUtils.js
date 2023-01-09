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
        return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
            var match

            if (entityCode in htmlEntities) {
                return htmlEntities[entityCode]
                /*eslint no-cond-assign: 0*/
            } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
                return String.fromCharCode(parseInt(match[1], 16))
                /*eslint no-cond-assign: 0*/
            } else if (match = entityCode.match(/^#(\d+)$/)) {
                return String.fromCharCode(~~match[1])
            } else {
                return entity
            }
        })
    }
}


module.exports = HTMLUtils
