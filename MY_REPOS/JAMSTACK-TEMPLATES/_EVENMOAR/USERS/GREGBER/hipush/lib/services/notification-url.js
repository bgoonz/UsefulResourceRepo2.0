var crypto = require('crypto');
var config = require('../config');

exports.format = format;
exports.decode = decode;

/**
 * Format url of the notification.
 *
 * @param {object} data
 * @param {number} data.userId
 * @param {number} data.notificationId
 * @param {number} data.url
 * @returns {string}
 */

function format(data) {
  return '/url?h=' + encode(data);
}

/**
 * Encode data.
 *
 * @param {object} data
 * @returns {string} crypted
 */

function encode(data) {
  var ar = [data.userId, data.notificationId, data.url];
  var cipher = crypto.createCipher('aes-128-cbc', config.urlSecret);
  var crypted = cipher.update(JSON.stringify(ar), 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

/**
 * Decode data.
 *
 * @param {string} crypted
 * @returns {object} data
 */

function decode(crypted) {
  var decipher = crypto.createDecipher('aes-128-cbc', config.urlSecret);
  var dec = decipher.update(crypted, 'hex', 'utf8');
  dec += decipher.final('utf8');
  var ar = JSON.parse(dec);
  return {
    userId: ar[0],
    notificationId: ar[1],
    url: ar[2]
  };
}
