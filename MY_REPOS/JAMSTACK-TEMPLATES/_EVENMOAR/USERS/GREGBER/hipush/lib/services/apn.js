var apn = require('apn');
var Promise = require('bluebird');
var config = require('../config');
var logger = require('../logger').child({type: 'apn'});

var closed = false;
var transmittedCount = 0;

exports.send = send;
exports.close = close;

// Start loop.
logTransmittedEvents();

// Create APN connection.
var apnConnection = new apn.Connection({
  cert: config.spn.cert,
  key: config.spn.key,
  passphrase: config.spn.keyPass,
  production: true,
  autoAdjustCache: true
});

apnConnection.on('error', function (err) {
  logger.error('error', err);
});

apnConnection.on('socketError', function (err) {
  logger.error('socketError', err);
});

apnConnection.on('transmitted', function () {
  transmittedCount++;
});

apnConnection.on('completed', function () {
  logger.info('completed');
});

apnConnection.on('connected', function () {
  logger.info('connected');
});

apnConnection.on('disconnected', function () {
  logger.info('disconnected');
});

apnConnection.on('timeout', function () {
  logger.info('socket timeout');
});

apnConnection.on('cacheTooSmall', function (difference) {
  logger.warn('cacheTooSmall', difference);
});

apnConnection.on('transmissionError', function (errorCode, notification, device) {
  logger.error('transmissionError', errorCode, notification, device);
});

/**
 * Send a notification.
 *
 * @param {object} options options
 * @param {object} options.alert alert
 * @param {string[]} options.urlArgs Args
 * @param {string} options.token Token
 */

function send(options) {
  var notification = new apn.Notification();
  notification.alert = options.alert;
  notification.urlArgs = options.urlArgs;

  apnConnection.pushNotification(notification, options.token);
  return Promise.resolve();
}

/**
 * Close connections.
 */

function close() {
  apnConnection.shutdown();
  closed = true;
}

/**
 * Log transmitted events.
 */

function logTransmittedEvents() {
  if (transmittedCount)
    logger.info({transmittedCount: transmittedCount}, 'transmitted');

  transmittedCount = 0;

  if (!closed)
    setTimeout(logTransmittedEvents, config.apn.transmittedLogTime);
}
