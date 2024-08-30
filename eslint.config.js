'use strict'

const jest = require('eslint-plugin-jest')
const neostandard = require('neostandard')

module.exports = [
  ...neostandard(),
  {
    files: ['lib/__tests__/**'],
    ...jest.configs['flat/recommended'],
    rules: {
      // Keep 'flat/recommended' below so rules will take precedence over 'flat/style' or any other
      // just in case that the same rule is defined in both places with different error level
      // i.e. jest/no-alias-methods rule
      ...jest.configs['flat/style'].rules,
      ...jest.configs['flat/recommended'].rules
    }
  }
]
