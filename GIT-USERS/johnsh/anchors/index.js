/**
 * Anchors <https://github.com/jonschlinkert/anchors>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */


var url = require('url');
var cheerio = require('cheerio');
var _ = require('lodash');

module.exports = function(str) {
  var anchors = [],
    attrs = [];

  // Use cheerio to extract valuse
  var $ = cheerio.load(str);

  // Build an object with useful info for each anchor
  $('a').each(function(i, elem) {
    attrs[i] = {
      class: $(this).attr('class') || '',
      title: $(this).attr('title') || '',
      name: $(this).attr('name') || '',
      alt: $(this).attr('alt') || '',
      rel: $(this).attr('rel') || '',
      href: url.parse($(this).attr('href'))
    }
  });

  return _.flatten(attrs);
};
