/* jshint camelcase: false */

var mongoose = require('../services/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
  max_tag_id: String
});

module.exports = mongoose.model('CrawlStatus', schema);