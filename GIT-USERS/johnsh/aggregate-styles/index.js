/**
 * consolidate-styles <https://github.com/jonschlinkert/consolidate-styles>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var Handlebars = require('handlebars');
var cheerio = require('cheerio');
var _ = require('lodash');


function attributes(attr) {
  if (attr) {
    return Object.keys(attr).map(function (key) {
      return ' ' + key + '="' + attr[key] + '"';
    }).join(' ');
  }
}

var unescape = function(str) {
  str = str.replace(/&apos;/g, '\'');
  return _.unescape(str);
};


Handlebars.registerHelper('addLink', function (context) {
  var styles = context.map(function(obj) {
    if (obj.attr) {
      var attrs = attributes(obj.attr);
      return '\n<link' + unescape(attrs) + '>';
    }
  }).join('');
  return new Handlebars.SafeString(styles);
});


Handlebars.registerHelper('addStyles', function (context) {
  var styles = context.map(function(obj) {
    if (obj.styles) {
      var attrs = attributes(obj.attr);
      var css = obj.styles || '';
      return '\n<style' + unescape(attrs) + '>' + unescape(css) + '</style>';
    }
  }).join('');
  return new Handlebars.SafeString(styles);
});

module.exports = function (html) {
  var $ = cheerio.load(html);

  var context = {};
  var styles = [];

  $('link').filter(function (i, elem) {
    styles.push({
      href: $(this).attr('href'),
      attr: elem.attribs
    });
  });

  $('style').filter(function (i, elem) {
    styles.push({
      attr: elem.attribs,
      styles: $(this).html()
    });
  });

  $('head').append('\n{{addLink styles}}');
  $('head').append('\n{{addStyles styles}}');

  // Compact the array
  context.styles = styles.filter(Boolean);

  // Strip link tags with `href`
  $('link').filter(function () {
    return $(this).attr('href') != null;
  }).remove();

  // Strip style tags with inner content
  $('style').filter(function () {
    return $(this).text().length !== 0;
  }).remove();

  var template = Handlebars.compile($.html());
  return template(context).replace(/&apos;/g, '\'');
};