/* global module, __dirname, require */
var webpackPostcssTools = require('webpack-postcss-tools');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var map = webpackPostcssTools.makeVarMap('./src/stylesheets/main.css');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss')
      },
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=/[hash].[ext]'
      },
      {
        loader: 'babel',
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties', 'transform-object-assign', 'transform-object-rest-spread']
        }
      }
    ]
  },

  postcss: [
    webpackPostcssTools.prependTildesToImports,

    require('postcss-custom-properties')({
      variables: map.vars
    }),

    require('autoprefixer')(),

    require('postcss-nested')()
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new ExtractTextPlugin('style/app.css', {allChunks: true}),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  context: path.join(__dirname, 'src'),
  entry: {
    app: './index',
    admin: './admin'
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
