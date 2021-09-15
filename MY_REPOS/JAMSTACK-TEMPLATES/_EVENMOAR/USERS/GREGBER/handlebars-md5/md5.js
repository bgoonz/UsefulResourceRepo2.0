'use strict';

var crypto = require('crypto'),
    fs = require('fs');

module.exports = function (path) {
  var content = fs.readFileSync(path);
  return crypto.createHash('md5').update(content).digest('hex');
};