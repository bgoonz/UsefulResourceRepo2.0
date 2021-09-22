const {
  mkdir
} = require('fs');
const exists = require('../exists');
const fn = require('./fn');

module.exports = fn(mkdir, exists);
