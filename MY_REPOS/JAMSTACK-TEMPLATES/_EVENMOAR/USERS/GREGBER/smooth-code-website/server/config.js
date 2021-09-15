var minimist = require('minimist');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');
var defaultsDeep = require('merge-defaults');


/**
 * Define config path.
 */

var configPath = path.join(__dirname, '..', 'config');

/**
 * Create and expose configuration.
 */

var defaultsConfig = readConfig('default');
var envConfig = readConfig(process.env.APP_ENV || process.env.NODE_ENV || 'development');
var args = minimist(process.argv.slice(2));

module.exports = defaultsDeep(envConfig, defaultsConfig, args);

/**
 * Read config file.
 *
 * @param {string} name
 * @returns {object}
 */

function readConfig(name) {
  var filepath = path.join(configPath, name + '.yml');

  if (! fs.existsSync(filepath)) return {};
  return yaml.safeLoad(fs.readFileSync(filepath, 'utf-8'));
}
