'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;

/**
 * Lazily required module dependencies
 */

require = utils;
require('get-value', 'get');
require('has-value', 'has');
require('set-value', 'set');
require('unset-value', 'unset');
require('rimraf', 'del');

require('project-name', 'project');
require('resolve-dir');
require('write-json');
require = fn;

/**
 * Create the key to use for getting and setting values.
 * If the key contains a filepath, and the filepath has
 * dots in it, we need to escape them to ensure that
 * `set-value` doesn't split on those dots.
 */

utils.toKey = function(filepath, key) {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }
  filepath = filepath.split('.').join('\\.');
  return filepath + (key ? ('.' + key) : '');
};

/**
 * Read a JSON file.
 *
 * @param {String} `filepath`
 * @return {Object}
 */

utils.readJson = function(filepath) {
  try {
    var str = fs.readFileSync(path.resolve(filepath), 'utf8');
    return JSON.parse(str);
  } catch (err) {}
  return {};
};

/**
 * Expose `utils`
 */

module.exports = utils;
