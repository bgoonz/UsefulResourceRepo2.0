'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var forEach = require('lodash').forEach;
var defaults = require('lodash').defaults;
var pick = require('lodash').pick;
var isArray = require('lodash').isArray;
var isFunction = require('lodash').isFunction;
var play = require('play');
var Pinger = require('./pinger');
var util = require('./util');

/**
 * Expose module.
 */

module.exports = Daemon;

/**
 * Create a new Daemon.
 *
 * @param {Object} options
 */

function Daemon(options) {
  this.options = defaults(options || {}, {
    time: 30000,
    threshold: 3,
    service: ['github', 'npm'],
    successSound: path.resolve(__dirname, '../sounds/mario-stage-cleared.mp3'),
    failureSound: path.resolve(__dirname, '../sounds/mario-die.mp3'),
    success: this.success.bind(this),
    failure: this.failure.bind(this)
  });

  // Convert service to array.
  if (! isArray(this.options.service)) this.options.service = [this.options.service];

  // Create pinger.
  this.pinger = new Pinger(pick(this.options, 'threshold'));

  // Add services.
  this.options.service.forEach(function (service, idx) {
    var name;

    if (! isFunction(service)) {
      name = service;
      service = require('./services/' + service)({ timeout: this.options.timeout || undefined });
    }
    else
      name = 'service-' + idx;

    this.pinger.add(name, service);
  }.bind(this));
}

/**
 * Start daemon.
 */

Daemon.prototype.start = function () {
  this.loop();
};

/**
 * Stop daemon.
 */

Daemon.prototype.stop = function () {
  clearInterval(this.loopInterval);
};

/**
 * Loop.
 */

Daemon.prototype.loop = function () {
  this.pinger.ping(function (err, statuses) {
    util.log('Get statuses', statuses);
    forEach(statuses, this.handleStatusChange, this);
    this.loopInterval = setTimeout(this.loop.bind(this), this.options.time);
  }.bind(this));
};

/**
 * Handle status change.
 *
 * @param {Array} history
 */

Daemon.prototype.handleStatusChange = function (status) {
  if (status === 'up') this.options.success();
  if (status === 'down') this.options.failure();
};

/**
 * Success.
 */

Daemon.prototype.success = function () {
  util.log('Success.');
  play.sound(this.options.successSound);
};

/**
 * Failure.
 */

Daemon.prototype.failure = function () {
  util.log('Failure.');
  play.sound(this.options.failureSound);
};