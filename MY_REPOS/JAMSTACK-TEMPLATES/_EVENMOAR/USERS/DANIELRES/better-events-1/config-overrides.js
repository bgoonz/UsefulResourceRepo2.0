const rewireEmotion = require("react-app-rewire-emotion");

module.exports = function override(config, env) {
  return rewireEmotion(config, env, { inline: true });
};
