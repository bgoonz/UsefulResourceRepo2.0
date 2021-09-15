/* eslint-disable no-process-env */
import productionConfig from '../production-config';
import path from 'path';
import webpack from 'webpack';

export default (app, {
  name = 'browser',
  bundle = 'bundle.js',
  entry = './browser',
} = {}) => {
  return {
    ...productionConfig,
    name,
    output: {
      path: path.join(__dirname, '../../../../public', app, 'dist'),
      publicPath: '/dist/',
      filename: bundle,
    },
    plugins: [
      ...productionConfig.plugins,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    ],
    entry: [entry],
    context: path.join(__dirname, '../../../../lib/apps', app),
  };
};
