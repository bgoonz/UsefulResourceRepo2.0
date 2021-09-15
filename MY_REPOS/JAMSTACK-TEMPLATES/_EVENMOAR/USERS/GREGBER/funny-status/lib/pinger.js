'use strict';

/**
 * Module dependencies.
 */

var async = require('async');
var forEach = require('lodash').forEach;
var defaults = require('lodash').defaults;
var map = require('lodash').map;
var util = require('./util');

/**
 * Expose module.
 */

module.exports = Pinger;

/**
 * Create a Pinger instance.
 */

function Pinger(options) {
  this.options = defaults(options || {}, {
    threshold: 3
  });
  this.services = {};
  this.history = {};
  this.statuses = {};
}

/**
 * Add a service.
 *
 * @param {String} name
 * @param {Function} service
 */

Pinger.prototype.add = function (name, service) {
  this.services[name] = service;
  this.history[name] = [];
};

/**
 * Ping all services.
 *
 * @param {Function} cb
 */

Pinger.prototype.ping = function (cb) {
  util.log('Starting ping services.');

  var self = this;
  var history = this.history;
  var statusChecks = map(this.services, function (service, name) {
    return function (cb) {
      util.log('Ping %s service', name);
      service(function (err) {
        if (err) util.log('Service %s, error', name, err);

        // Last status.
        var status = err ? 'down' : 'up';
        util.log('Service %s, %s', name, status);

        // History.
        history[name].unshift(status);

        cb(null, self.updateStatus(name));
      });
    };
  });

  async.parallel(statusChecks, function (err, statuses) {
    if (err) return cb(err);
    this.purge();
    cb(null, statuses);
  }.bind(this));
};

/**
 * Purge history.
 */

Pinger.prototype.purge = function () {
  forEach(this.history, function (entry, name) {
    this.history[name] = entry.slice(0, 10);
  }.bind(this));
};

/**
 * Update service status.
 *
 * @param {String} name
 */

Pinger.prototype.updateStatus = function (name) {
  var lastStatus = this.history[name][0];
  var currentStatus = this.statuses[name];

  // If history is not complete.
  if (this.history[name].length < this.options.threshold) return false;

  // If last status is not different than current status.
  if (currentStatus === lastStatus) return false;

  var lastStatuses = this.history[name].slice(0, this.options.threshold);
  var consecutiveStatuses = lastStatuses.every(function (status) {
    return status === lastStatus;
  });

  // If there is no consecutive statuses.
  if (! consecutiveStatuses) return false;

  // Update current status.
  this.statuses[name] = lastStatus;

  // Return the new status, if it's not the first check.
  return currentStatus ? lastStatus : false;
};