module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  setupFiles: ['<rootDir>/config/polyfills.js'],
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{js}'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^(?!.*\\.(js|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleNameMapper: {
    '^@assets(.*)$': '<rootDir>/src/assets',
    '^@theme(.*)$': '<rootDir>/src/assets',
  },
};
