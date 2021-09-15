const {
  stat
} = require('fs');
const fn = require('./fn');

module.exports = fn(stat);
