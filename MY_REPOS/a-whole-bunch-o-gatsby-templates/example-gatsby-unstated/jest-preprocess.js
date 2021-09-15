const babelOptions = {
  presets: [
    '@babel/react',
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-remove-graphql-queries',
  ],
}

module.exports = require('babel-jest').createTransformer(babelOptions)
