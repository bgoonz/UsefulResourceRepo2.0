import developmentConfig from '../development-config';
import path from 'path';
import webpack from 'webpack';

export default (app, {
  name = 'browser',
  bundle = 'bundle.js',
  entry = './browser',
} = {}) => {
  return {
    ...developmentConfig,
    name,
    output: {
      ...developmentConfig.output,
      publicPath: 'http://localhost:8080/assets/',
      path: path.join(__dirname, '../../../../public', app, 'dist'),
      filename: `${app}-${bundle}`,
    },
    module: {
      ...developmentConfig.module,
      loaders: [
        {
          ...developmentConfig.module.loaders[0],
          query: {
            plugins: [['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }],
            }]],
          },
        },
        ...developmentConfig.module.loaders.slice(1),
      ],
    },
    entry: [entry],
    plugins: [
      ...developmentConfig.plugins,
      new webpack.NoErrorsPlugin(),
    ],
    context: path.join(__dirname, '../../../../src/apps', app),
  };
};
