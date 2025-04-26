const jest = require('eslint-plugin-jest')
const neostandard = require('neostandard')

module.exports = [
  ...neostandard(),
  {
    files: ['lib/__tests__/*.test.js'],
    ...jest.configs['flat/style']
  },
  {
    files: ['lib/__tests__/*.test.js'],
    ...jest.configs['flat/recommended']
  }
]
