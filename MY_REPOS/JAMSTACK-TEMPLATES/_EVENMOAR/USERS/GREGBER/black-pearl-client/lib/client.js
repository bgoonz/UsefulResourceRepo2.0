/**
 * Module dependencies.
 */

var Primus = require('primus');
var Socket = Primus.createSocket();


/**
 * Expose module.
 */

module.exports = Client;


/**
 * Create a new black pearl Client
 *
 * @param {String} url
 */

function Client(url) {
  url = url || 'http://localhost:9400';
  this.primus = new Socket(url);
}


/**
 * Push a metric to the client.
 *
 * @param {String} name
 * @param {Object} data
 * @returns {client} for chaining
 */

Client.prototype.push = function (name, data) {
  this.primus.write({ name: name, data: data });
  return this;
};