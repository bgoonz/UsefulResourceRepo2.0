const stat = require('../stat');
const dirSize = require('../dirSize');
const fn = require('./fn');

module.exports = fn(stat, dirSize);
