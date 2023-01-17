const path = require('path')

class AppDirectory {
    static data() {
        return path.resolve(__dirname, '../data')
    }
}

module.exports = AppDirectory
