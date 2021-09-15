var path = require('path');
var _ = require('lodash');
var fs = require('fs');

/**
 * Define config path.
 */

var configPath = path.join(__dirname, '..', 'config');

/**
 * Create and expose configuration.
 */

var config = module.exports = readConfig('default');
_.merge(config, readConfig(process.env.NODE_ENV || 'development'));


/**
 * Read config file.
 *
 * @param {string} name
 * @returns {object}
 */

function readConfig(name) {
  var filepath = path.join(configPath, name + '.js');

  if (!fs.existsSync(filepath)) return {};
  return require(filepath);
}
