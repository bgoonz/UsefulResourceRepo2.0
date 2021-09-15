var spnAuthToken = require('spn-auth-token');
var config = require('../config');

// Expose methods.
exports.encode = encode;
exports.decode = decode;

/**
 * Crypt an id into a token.
 *
 * @param {*} payload
 * @returns {string} token
 */

function encode(payload) {
  return spnAuthToken.encode(payload, config.spn.authTokenSalt);
}

/**
 * Decrypt token into an id.
 *
 * @param {string} token
 * @returns {*} payload
 */

function decode(token) {
  return spnAuthToken.decode(token, config.spn.authTokenSalt);
}
