exports.onCreateBabelConfig = ({ actions }, pluginOptions) => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  // plugin settings
  const pluginSettings = {
    name: 'babel-plugin-transform-remove-console',
  };

  // whether specified the plugin options
  const hasOptions = Object.keys(pluginOptions).filter(
    item => item !== 'plugins'
  ).length;

  if (hasOptions && pluginOptions.exclude) {
    if (Array.isArray(pluginOptions.exclude)) {
      pluginSettings.options = {
        exclude: pluginOptions.exclude,
      };
      console.log('pluginSettings-2', pluginSettings);
    }
  }

  // set the plugin with its settings
  actions.setBabelPlugin(pluginSettings);
};
