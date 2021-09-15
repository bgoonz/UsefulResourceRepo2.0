const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: 'react-svg-loader',
              },
            ],
          },
          {
            test: /\.modernizrrc.js$/,
            use: ['modernizr-loader'],
          },
          {
            test: /\.modernizrrc(\.json)?$/,
            use: ['modernizr-loader', 'json-loader'],
          },
          {
            test: /\.(jpe?g|jpg|gif|png|woff|woff2|eot|ttf|webp)$/,
            use: [{ loader: 'file-loader' }],
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    alias: {
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@theme': path.resolve(__dirname, '../src/theme'),
      modernizr$: path.resolve(__dirname, '../.modernizrrc'),
    },
  },
};
