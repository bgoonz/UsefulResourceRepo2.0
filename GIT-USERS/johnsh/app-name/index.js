/*!
 * app-name <https://github.com/jonschlinkert/app-name>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(str, words, options) {
  var arr = str.split(/[\W_-]/).filter(Boolean);
  var segments = [];

  options = options || {};

  if (words) {
    words = !Array.isArray(words) ? [words] : words;
    words.forEach(function(word) {
      segments = segments.concat(word.split('-'));
    });
  }

  var filtered = arr.filter(function(segment) {
    return segments.indexOf(segment) === -1;
  });


  if (options.first) {
    return filtered[0];
  }

  if (options.last) {
    return filtered[filtered.length - 1];
  }

  return filtered.join(options.sep || '-');
};