const fs = require('fs')
const path = require('path')

const _defaults = {
    minify: true
}

class JSONStorage {
    static store(dir, filename, data, options) {
        options = { ..._defaults, ...options }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, true)
        }
        const filePath = path.join(dir, filename)
        const json = JSON.stringify(data, null, options.minify ? 0 : 4)
        fs.writeFileSync(filePath, json)
    }
}

module.exports = JSONStorage
