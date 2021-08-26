const {defaults} = require('jest-config');

// jest.config.js
module.exports = {
  displayName: {
    name: "API",
    color: "magenta"
  },
  verbose: true,
  collectCoverage: true,
  cacheDirectory: "/tmp/jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "node_modules/"
  ],
  collectCoverageFrom: [
    "index.js"
  ]
}

