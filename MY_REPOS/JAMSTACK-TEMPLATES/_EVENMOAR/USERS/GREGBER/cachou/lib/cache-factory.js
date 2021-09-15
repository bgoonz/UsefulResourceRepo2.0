/**
 * Module dependencies.
 */

var Cache = require('./cache');

/**
 * Expose module.
 */

module.exports = cacheFactory;

/**
 * Cache factory.
 */

function cacheFactory(options) {
  return new Cache(options);
}