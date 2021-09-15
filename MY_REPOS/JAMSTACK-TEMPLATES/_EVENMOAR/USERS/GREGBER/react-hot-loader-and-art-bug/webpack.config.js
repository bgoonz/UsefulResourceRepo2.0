const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: ['./src/index.jsx',],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      use: 'babel-loader',
    }]
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Hot Loader and ReactART Bug',
      hash: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
