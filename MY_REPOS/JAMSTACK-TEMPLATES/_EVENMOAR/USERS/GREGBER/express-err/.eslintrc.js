module.exports = {
  root: true,
  env: {
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
  },
}
