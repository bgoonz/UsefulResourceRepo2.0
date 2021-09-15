import baseConfig from './base-config';

export default {
  ...baseConfig,
  debug: true,
  devtool: 'eval',
  output: {
    ...baseConfig.output,
    pathinfo: true,
  },
};
