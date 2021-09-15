const { readFile } = require('fs');
const fn = require('./fn');

module.exports = fn(readFile);
