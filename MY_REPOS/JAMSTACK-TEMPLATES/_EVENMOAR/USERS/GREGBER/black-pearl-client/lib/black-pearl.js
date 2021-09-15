/**
 * Module dependencies.
 */

var Client = require('./client');

/**
 * Expose methods.
 */

exports.createClient = createClient;
exports.Client = Client;

/**
 * Create a new client.
 */

function createClient(url) {
  return new Client(url);
}