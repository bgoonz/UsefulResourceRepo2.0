/**
 * Module dependencies.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var r = require('rethinkdb');
var pipeEvent = require('pipe-event');
var model = require('./model');

/**
 * Expose module.
 */

module.exports = Client;

/**
 * Create a new client.
 *
 * @param {object} [options]
 * @see avalaible options http://rethinkdb.com/api/javascript/connect/
 */

function Client(options) {
  EventEmitter.call(this);
  var client = this;

  this.r = r;
  this.connDeferred = r.connect(options);
  this.conn = null;

  this.connDeferred
  .then(function onConnect(conn) {
    if (client.conn) return ;

    client.conn = conn;
    pipeEvent(['connect', 'close', 'error'], conn, client);
  })
  .nodeify(function onError(err) {
    if (err) client.emit('error', err);
  });
}

util.inherits(Client, EventEmitter);

/**
 * Run a command on the current connection.
 *
 * @param {TermBase} term
 * @param {function} [cb]
 */

Client.prototype.run = function (term, cb) {
  return this.connDeferred
  .then(function onConnect(conn) {
    return term.run(conn);
  })
  .nodeify(cb);
};

/**
 * Close the connection.
 *
 * @see http://rethinkdb.com/api/javascript/close/
 */

Client.prototype.close = function () {
  var args = arguments;
  var client = this;

  this.connDeferred.then(function closeConnection(conn) {
    conn.close.apply(conn, args);
    client.conn = null;
  });
};

/**
 * Create a new model.
 *
 * @param {object} options
 * @param {string} options.tableName Table name
 */

Client.prototype.createModel = function (options) {
  return model.create(this, options);
};