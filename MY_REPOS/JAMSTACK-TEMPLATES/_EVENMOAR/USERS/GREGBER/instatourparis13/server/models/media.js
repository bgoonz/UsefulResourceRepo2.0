/* jshint camelcase: false */

var mongoose = require('../services/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
  attribution: Schema.Types.Mixed,
  tags: [String],
  location: Schema.Types.Mixed,
  comments: Schema.Types.Mixed,
  filter: String,
  created_time: Number,
  link: String,
  likes: Schema.Types.Mixed,
  images: Schema.Types.Mixed,
  users_in_photo: Array,
  caption: Schema.Types.Mixed,
  type: String,
  id: String,
  user: Schema.Types.Mixed
});

module.exports = mongoose.model('Media', schema);