'use strict';

/**
 * Module dependencies.
 */

var request = require('request');
var defaults = require('lodash').defaults;

/**
 * Expose module.
 */

module.exports = npm;

/**
 * NPM service.
 *
 * @param {Object} options
 */

function npm(options) {
  options = defaults(options || {}, {
    timeout: 3000,
    url: 'http://registry.npmjs.org'
  });

  return function (cb) {
    request(options, function (err, res) {
      // Error.
      if (err) return cb(err);

      // Status code.
      if (res.statusCode !== 200) return cb(new Error('Bad statusCode: ' + res.statusCode));

      cb();
    });
  };
}