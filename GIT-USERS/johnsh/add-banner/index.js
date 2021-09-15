/*!
 * add-banner <https://github.com/jonschlinkert/add-banner>
 *
 * Copyright (c) 2014-present Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const author = require('parse-authors');
const strip = require('strip-banner');
const Engine = require('engine');
const load = require('load-pkg');
const year = require('year');
const read = filepath => fs.readFileSync(filepath, 'utf8');

/**
 * Create the context necessary for rendering the banner template
 */

const createContext = locals => {
  const person = locals.author || '';
  const repository = locals.homepage || locals.repository || '';
  const homepage = repository.url ? repository.url : repository;
  const context = {
    author: person.name || author(person)[0].name || 'unknown',
    homepage: homepage || 'unknown',
    license: locals.license || 'MIT',
    year: locals.year || year()
  };
  return Object.assign({}, locals, context);
};

/**
 * Add a comment banner to the specified JavaScript file.
 *
 * ```js
 * const banner = require('add-banner');
 * banner('index.js');
 *
 * // Specify a custom banner template to use:
 * banner('index.js', { banner: 'my-banner.tmpl' });
 *
 * // Define custom locals to use when rendering the template
 * banner('index.js', { name: 'foo', username: 'jonschlinkert' });
 * ```
 * @param  {String} `filepath` The file to update with a banner.
 * @param  {Object} `options` Pass a custom banner template to `banner`, or extend the context passed to templates. By default package.json is used, any property added to the options object will extend the default object (package.json) and will be passed to templates as context.
 * @return {String}
 */

module.exports = function(str, options = {}) {
  const engine = new Engine(options);
  const pkg = load.sync(options);
  const tmpl = read(options.template || path.join(__dirname, 'banner.tmpl'));
  const context = createContext(Object.assign({}, pkg, options));
  const fn = engine.compile(tmpl, options);
  const banner = fn(context);
  let content = strip(read(str));
  if (content[0] === '\n' && banner.slice(-1) === '\n') {
    content = content.slice(1);
  }
  return banner + content;
};
