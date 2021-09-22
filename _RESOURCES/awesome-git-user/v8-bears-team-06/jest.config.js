module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/client/.next/",
    "<rootDir>/node_modules/",
  ],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!client/.next/**",
    "!client/next.config.js",
    "!coverage/**",
    "!jest.config.js",
  ],
};
