'use strict';

/**
 * Module dependencies.
 */

var request = require('request');
var defaults = require('lodash').defaults;

/**
 * Expose module.
 */

module.exports = github;

/**
 * GitHub service.
 *
 * @param {Object} options
 */

function github(options) {
  options = defaults(options || {}, {
    timeout: 3000,
    url: 'https://status.github.com/api/status.json'
  });

  return function (cb) {
    request(options, function (err, res, body) {
      // Error.
      if (err) return cb(err);

      // Status code.
      if (res.statusCode !== 200) return cb(new Error('Bad statusCode: ' + res.statusCode));

      // Parse body.
      try {
        body = JSON.parse(body);
      }
      catch (e) {
        return cb(e);
      }

      // GitHub status.
      if (body.status !== 'good') return cb(new Error('GitHub status not good: ' + body.status));

      cb();
    });
  };
}