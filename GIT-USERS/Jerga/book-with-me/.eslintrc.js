module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  plugins: ["ember"],
  extends: ["eslint:recommended", "plugin:ember/recommended"],
  env: {
    browser: true,
  },
  rules: {
    "ember/jquery-ember-run": 0,
  },
  overrides: [
    // node files
    {
      files: [
        "testem.js",
        "ember-cli-build.js",
        "config/**/*.js",
        "lib/*/index.js",
      ],
      parserOptions: {
        sourceType: "script",
        ecmaVersion: 2015,
      },
      env: {
        browser: false,
        node: true,
      },
    },

    // test files
    {
      files: ["tests/**/*.js"],
      excludedFiles: ["tests/dummy/**/*.js"],
      env: {
        embertest: true,
      },
    },
  ],
};
