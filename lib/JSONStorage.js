const fs = require('fs')
const path = require('path')

class JSONStorage {
    static writeSync(dir, filename, data, options) {
        const defaults = { minify: true }
        options = { ...defaults, ...options }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        const filePath = path.join(dir, filename)
        const json = JSON.stringify(data, null, options.minify ? 0 : 4)
        fs.writeFileSync(filePath, json)
    }

    static readSync(dir, filename) {
        const filePath = path.join(dir, filename)

        if (!fs.existsSync(filePath)) {
            throw new Error('File Not Found')
        }
        const data = fs.readFileSync(filePath, { encoding: 'utf8' })
        return JSON.parse(data)
    }
}

module.exports = JSONStorage
