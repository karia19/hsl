module.exports = {
  moduleNameMapper: {
    '^axios$': '<rootDir>/node_modules/axios',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
};
