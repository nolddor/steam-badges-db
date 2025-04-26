module.exports = {
  bail: 1,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
