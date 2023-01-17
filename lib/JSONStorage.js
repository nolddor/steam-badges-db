const fs = require('fs')
const path = require('path')

class JSONStorage {
    static store(dir, filename, data) {
        const filePath = path.join(dir, filename)

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, true)
        }
        const json = JSON.stringify(data, null, 4)
        fs.writeFileSync(filePath, json)
    }
}

module.exports = JSONStorage
