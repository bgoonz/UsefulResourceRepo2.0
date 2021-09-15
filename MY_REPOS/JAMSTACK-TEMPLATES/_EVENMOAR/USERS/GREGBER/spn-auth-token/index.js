var jwt = require('jwt-simple');

exports.encode = encode;
exports.decode = decode;

/**
 * Create auth token from a payload and a secret.
 *
 * @param {*} payload Payload
 * @param {string} secret Secret
 */

function encode(payload, secret) {
  return jwt.encode(payload, secret);
}

/**
 * Decrypt the token using the key;
 *
 * @param {string} token Token
 * @param {string} secret Secret
 * @returns {*} payload
 */

function decode(token, secret) {
  return jwt.decode(token, secret);
}
