'use strict';

/**
 * Expose modules.
 */

exports.Daemon = require('../lib/daemon');
exports.Pinger = require('../lib/pinger');

/**
 * Expose services.
 */

['github', 'npm'].forEach(function (service) {
  exports.services[service] = require('../lib/services/' + service);
});