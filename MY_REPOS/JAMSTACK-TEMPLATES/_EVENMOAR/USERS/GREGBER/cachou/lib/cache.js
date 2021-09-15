/**
 * Module dependencies.
 */

var async = require('async');
var _ = require('lodash');
var parser = require('./parser');
var redis = require('redis');

/**
 * Expose module.
 */

module.exports = Cache;

/**
 * Create a new resource cache.
 *
 * @param {Object} options
 */

function Cache(options) {
  options = _.defaults(options || {}, {
    redis: {}
  });

  // Convert TTL in second.
  this.ttl = ! _.isUndefined(options.ttl) ? Math.ceil(options.ttl / 1000) : null;

  // Define prefix.
  this.prefix = options.prefix || 'cache:';

  // Create a redis client.
  this.redis = this._createRedisClient(options.redis);
}

/**
 * Return a resource from the cache.
 *
 * @param {String} key
 * @param {Function} callback
 */

Cache.prototype.get = function getResource(key, callback) {
  // If key is not defined, returns null.
  if (! key) return callback();

  // Prefix key.
  key = this.prefix + key;

  async.waterfall([
    function getData(next) {
      this.redis.get(key, next);
    }.bind(this),
    function decodeData(data, next) {
      parser.decode(data, next);
    }
  ], callback);
};

/**
 * Return a resource from the cache.
 *
 * @param {String} key
 * @param {Object} data
 * @param {Function} callback
 */

Cache.prototype.set = function setResource(key, data, callback) {
  // If key is not defined or if TTL is equal to `0`, do nothing.
  if (! key || this.ttl === 0) {
    if (callback) callback();
    return ;
  }

  // Prefix key.
  key = this.prefix + key;

  async.waterfall([
    function encodeData(next) {
      parser.encode(data, next);
    },
    function setData(data, next) {
      var multi = this.redis.multi();
      multi.set(key, data);

      if (this.ttl) multi.expire(key, this.ttl);

      multi.exec(function (err) {
        // If there is no callback, emit the error on the redis client.
        if (err && ! callback) this.redis.emit('error', err);
        next(err);
      }.bind(this));
    }.bind(this)
  ], callback);
};

/**
 * Delete a resource from the cache.
 *
 * @param {String} name
 * @param {Number} id
 * @param {Function} callback
 */

Cache.prototype.del = function delResource(key, callback) {
  // If key is not defined, do nothing.
  if (! key) {
    if (callback) return callback();
    return ;
  }

  // Prefix key.
  key = this.prefix + key;

  this.redis.del(key, callback);
};

/**
 * Delete all matching resources.
 *
 * @param {String} pattern
 * @param {Function} callback
 */

Cache.prototype.delAll = function delAllResource(pattern, callback) {
  async.waterfall([
    function getKeys(next) {
      this.redis.keys(this.prefix + pattern, next);
    }.bind(this),
    function delKeys(keys, next) {
      var multi = this.redis.multi();

      keys.forEach(function (key) {
        multi.del(key);
      }, this);

      return multi.exec(next);
    }.bind(this)
  ], callback);
};

/**
 * Close the redis connection.
 *
 * @param {Function} callback
 */

Cache.prototype.close = function close(callback) {
  this.redis.quit(callback);
};

/**
 * Create the redis client.
 *
 * @param {Object} options
 */

Cache.prototype._createRedisClient = function _createRedisClient(options) {
  if (_.isFunction(options)) return options();

  return redis.createClient(options.port, options.host, _.omit(options, 'port', 'host'));
};