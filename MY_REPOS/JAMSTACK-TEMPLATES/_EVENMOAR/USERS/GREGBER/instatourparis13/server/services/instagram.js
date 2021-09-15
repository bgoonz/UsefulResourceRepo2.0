var config = require('../config');

var ig = module.exports = require('instagram-node').instagram();

ig.use(config.get('instagram'));