// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {},
  extends: [
    "eslint:recommended", // eslint default rules
    "plugin:@typescript-eslint/eslint-recommended", // eslint TypeScript rules (github.com/typescript-eslint/typescript-eslint)
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {},
};
