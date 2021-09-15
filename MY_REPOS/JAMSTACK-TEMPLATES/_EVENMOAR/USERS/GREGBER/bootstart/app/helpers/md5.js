var Handlebars = require('handlebars'),
crypto = require('crypto'),
fs = require('fs');

Handlebars.registerHelper('md5', function (path) {
  var content = fs.readFileSync(path);
  return crypto.createHash('md5').update(content).digest('hex');
});

exports = module.exports = Handlebars;