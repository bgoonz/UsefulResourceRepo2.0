/**
 * Module dependencies.
 */

var http = require('http');
var Primus = require('primus');
var elasticsearch = require('elasticsearch');
var extend = require('extend');
var log = require('./util').log;

/**
 * Expose module.
 */

module.exports = Server;

/**
 * Create a new black pearl Server.
 *
 * @param {Object} options
 */

function Server(options) {
  options = options || {};
  this.httpServer = http.createServer();
  this.primus = new Primus(this.httpServer);
  this.es = new elasticsearch.Client(options.es);
}

/**
 * Listen on a specific port.
 *
 * @param {Number} port
 */

Server.prototype.listen = function (port) {
  this.primus.on('connection', function (spark) {
    spark.on('data', this.onReceiveMetric.bind(this));
  }.bind(this));

  this.httpServer.listen(port);
};

/**
 * Handle metrics.
 *
 * @param {Object} metric
 */

Server.prototype.onReceiveMetric = function (metric) {
  this.es.index({
    index: 'blackpearl',
    type: metric.name,
    body: extend({
      '@timestamp': new Date().toJSON()
    }, metric.data)
  }, function (err, res) {
    if (err) log('Error indexing: %j', err);
    log('Indexed metric: %j', metric);
    log('Elastic search result: %j', res);
  });
};