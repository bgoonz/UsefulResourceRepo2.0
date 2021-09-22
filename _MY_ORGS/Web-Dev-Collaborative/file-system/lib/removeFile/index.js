const {
  unlink
} = require('fs');
const fn = require('./fn');

module.exports = fn(unlink);
