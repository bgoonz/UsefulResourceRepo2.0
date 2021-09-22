/*!
 * api-toc <https://github.com/jonschlinkert/api-toc>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var code = require('code-context');
var mdu = require('markdown-utils');
var merge = require('mixin-deep');
var filter = require('filter-object');
var relative = require('relative');

/**
 * Expose `toc`
 */

module.exports = function toc(dir, opts, fn) {
  if (typeof dir !== 'string') {
    throw new TypeError('api-toc expects `directory` to be a string.');
  }

  if (typeof opts === 'function') {
    fn = opts; opts = {};
  }

  opts = opts || {};
  var obj = lookup(dir);
  var res = format(obj, opts, fn);
  var out = '';

  if (opts.prefix) {
    out += opts.prefix.split('%total').join(res.total);
    out += '\n\n';
  }
  out += res.list.replace(/^\s*/, '');
  return out;
};

function lookup(dir) {
  var files = fs.readdirSync(dir);
  var len = files.length, i = 0;
  var res = {};
  while (len--) {
    var fp = path.resolve(dir, files[i++]);
    if (fs.statSync(fp).isDirectory()) {
      merge(res, lookup(fp));
    } else if(/\.js$/.test(fp)) {
      res[relative(fp)] = require(fp);
    }
  }
  return res;
}

/**
 * Get the code context for a JavaScript file.
 */

function context(str) {
  var arr = code(str);
  var len = arr.length, i = 0;
  var res = {};

  while (len--) {
    var ele = arr[i++];
    if (ele.type !== 'comment') {
      res[ele.name] = ele.begin;
    }
  }
  return res;
}

/**
 * Generate a formatted list that includes the given files,
 * and their respective methods. Uses code context to build
 * the list.
 *
 * @param  {Object} `obj` Object, The key is a file name and the properties are the methods.
 * @return {Object}
 */

function format(obj, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts; opts = {};
  }

  opts = opts || {};
  if (Array.isArray(opts.filter) || typeof opts.filter === 'string') {
    obj = filter(obj, opts.filter);
  }

  var keys = Object.keys(obj);
  var len = keys.length, i = 0;
  var str = '';
  var total = len;

  while (len--) {
    var fp = keys[i++];
    var ctx = context(read(fp), fn);
    var name = basename(fp);
    str += heading(name, fp);

    var list = obj[fp];
    var methods = Object.keys(list);
    total += methods.length;

    str += listify(fp, methods, ctx);
  }

  var res = {};
  res.list = str;
  res.total = total;
  return res;
}

/**
 * Create a formatted list for a file and it methods.
 *
 * @param  {String} `fp` File path
 * @param  {Array} `items` Array of items to format.
 * @param  {Object} `ctx` Code context, mainly for getting line numbers to create links.
 * @return {Array}
 */

function listify(fp, methods, ctx) {
  var len = methods.length, i = 0;
  var res = [''];
  while (len--) {
    var method = methods[i++];
    var line = ctx[method];
    var item = line ? linkify('.' + method, fp, '#L' + line) : method;
    item = '  - ' + item;
    res.push(item);
  }
  return res.sort().join('\n');
}

/**
 * File utils
 */


function basename(fp) {
  return path.basename(fp, path.extname(fp));
}

function read(fp) {
  return fs.readFileSync(fp, 'utf8');
}

/**
 * Heading/link utils
 */

function linkify(name, fp, append) {
  return mdu.link(name, relative(fp) + (append ? append : ''));
}

function heading(name, fp) {
  return '\n+ ' + mdu.strong(linkify(name, fp));
}
