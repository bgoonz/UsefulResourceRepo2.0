/* global module, __dirname, require */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties', 'transform-object-assign', 'transform-object-rest-spread']
        }
      }
    ]
  },

  context: path.join(__dirname, 'src'),
  entry: {
    app: './index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  externals:  [/^vendor\/.+\.js$/],
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    devTool: 'source-map'
  },
};
