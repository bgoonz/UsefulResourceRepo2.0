module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  globals: {
    __PATH_PREFIX__: ``,
  },
}
