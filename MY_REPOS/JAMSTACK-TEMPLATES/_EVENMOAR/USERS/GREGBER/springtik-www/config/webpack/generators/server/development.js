import developmentConfig from '../development-config';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

const nodeModules = fs.readdirSync(path.join(__dirname, '../../../../node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((modules, mod) => ({...modules, [mod]: `commonjs ${mod}`}));

export default app => {
  return {
    ...developmentConfig,
    name: 'server',
    target: 'node',
    output: {
      ...developmentConfig.output,
      path: path.join(__dirname, '../../../../public', app, 'dist'),
      publicPath: '/dist/',
      filename: 'bundle.server.js',
      libraryTarget: 'commonjs2',
    },
    entry: ['./server'],
    externals: nodeModules,
    plugins: [
      ...developmentConfig.plugins,
      new webpack.BannerPlugin('require("source-map-support").install();',
        {raw: true, entryOnly: false}),
    ],
    context: path.join(__dirname, '../../../../src/apps', app),
  };
};
