/* global -Handlebars */
var mandrillMail = require('mandrill-send')('GZoGtCqu9ER5ogoPCVsQFw'),
fs = require('fs'),
Handlebars = require('handlebars'),
templatePath = global.base + '/app/templates/emails',
templates = [],

resolveTemplatePath =  function (name) {
  return templatePath + '/' + name + '.hbs';
},

getTemplate = function (name, callback) {
  // template in cache ?
  if (typeof templates[name] !== 'undefined') {
    return callback(templates[name]);
  }

  // read template from file
  fs.readFile(resolveTemplatePath(name), function (err, data) {
    if (err) {
      return console.log(err);
    }

    // cache template
    templates[name] = Handlebars.compile(data + '');

    return callback(templates[name]);
  });
},

mail = function (templateName, data, options, callback) {
  getTemplate(templateName, function (template) {
    options.html = template(data);
    mandrillMail(options, callback);
  });
};

module.exports = exports = mail;