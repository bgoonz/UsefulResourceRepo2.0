'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');
var VError = require('verror');

var Facilitator;

module.exports = Facilitator = function (options) {
  Object.assign(this, options);

  if (! this.redis) {
    throw new VError('A Redis instance (i.e., `options.redis`) is required!');
  }

  if (! this.logger) {
    this.logger = {
      error: console.error,
      info: console.log
    };
  }
};

Facilitator.prototype.generate = function (data, options) {
  var _this;

  _this = this;

  return new Promise(function (resolve, reject) {
    var hash;
    var key;
    var token;

    token = (options && options.token) ? options.token :
      crypto.randomBytes(30).toString('base64')
        .split('/').join('_')
        .split('+').join('-');
    hash = sha(token);
    key = (options && options.prefix) ? (options.prefix + hash) : ('' + hash);

    if (typeof data !== 'string') {
      data.hash = hash + '';
      data.token = token + '';
    }

    _this.redis.set(key, JSON.stringify(data), function (error) {
      if (error) {
        error = new VError(error, 'Unable to set "%s" to the cache.', key);

        _this.logger.error(error);

        reject(error);

        return;
      }

      if (options && options.timeout) {
        _this.redis.expire(key, options.timeout);
      }

      resolve(token);
    });
  });
};

Facilitator.prototype.read = function (token, options) {
  var _this;

  _this = this;

  return new Promise(function (resolve, reject) {
    var key;

    key = (options && options.prefix) ?
      (options.prefix + sha(token)) :
      ('' + sha(token));

    _this.redis.get(key, function (error, data) {
      if (error) {
        error = new VError(error, 'Unable to get "%s" from the cache.', key);

        _this.logger.error(error);

        reject(error);

        return;
      }

      try {
        data = JSON.parse(data);
      } catch (e) {
        error = new VError(e, 'Error parsing data from "%s".', key);

        _this.logger.error(error);

        reject(error);

        return;
      }

      resolve(data);
    });
  });
};

function sha (token) {
  return crypto.createHash('sha1')
    .update(token).digest('hex');
}
