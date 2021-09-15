module.exports = {
  plugins: ['react', 'jest'],
  env: {
    node: true,
    browser: true,
    es2020: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/no-unescaped-entities': [0],
    'react/no-render-return-value': [0],
    'react/self-closing-comp': ['error', { component: true, html: true }]
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
