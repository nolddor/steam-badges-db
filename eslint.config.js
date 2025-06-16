const jest = require('eslint-plugin-jest')
const neostandard = require('neostandard')

module.exports = [
  ...neostandard(),
  {
    files: ['src/lib/__tests__/*.test.js'],
    ...jest.configs['flat/style']
  },
  {
    files: ['src/lib/__tests__/*.test.js'],
    ...jest.configs['flat/recommended']
  }
]
