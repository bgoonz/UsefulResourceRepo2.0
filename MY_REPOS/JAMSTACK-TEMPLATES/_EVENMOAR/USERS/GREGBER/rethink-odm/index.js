/**
 * Module dependencies.
 */

var Client = require('./lib/client');

/**
 * Expose module.
 */

module.exports = createClient;
module.exports.createClient = createClient;

function createClient(options) {
  return new Client(options);
}