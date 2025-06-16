/**
 * Path module for handling file and directory paths
 * @const {Object} path
 */
const path = require('path')

/**
 * Enumeration of folder paths used in the application
 * @readonly
 * @enum {string}
 */
module.exports = Object.freeze({
  /** Path to the data directory */
  DATA: path.resolve(__dirname, '../../data')
})
