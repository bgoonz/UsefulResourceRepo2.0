var mongoose = require('mongoose'),
  config = require('../config');

mongoose.connect(config.get('mongo:uri'));

module.exports = mongoose;