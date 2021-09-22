const { rmdir } = require('fs');
const list = require('../list');
const removeFile = require('../removeFile');
const fn = require('./fn');

module.exports = fn(rmdir, list, removeFile);
