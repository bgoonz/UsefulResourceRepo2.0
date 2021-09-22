'use strict';

var chalk = require('chalk');
var symbol = require('log-symbols');
var get = require('get-value');
var set = require('set-value');
var has = require('has-value');

module.exports = function lint(app, file) {
  var str = file.content || file.contents.toString();
  var m, copy = str;

  while (m = /<%[=-]?(.*)%>/gm.exec(copy)) {
    copy = copy.split(m[0]).join('');
    var key = m[1].trim();
    var isHelper = key.indexOf('(') !== -1;
    key = key.split('(')[0];

    if (isHelper) {
      helper(app, file, key);
    } else {
      data(app, file, key);
    }
  }
}

function data(app, file, key) {
  var o = has(app.options, key);
  var c = has(app.cache.data, key);
  var d = has(file.data, key);
  if (!c && !d && !o) {
    set(file.data, key, message(key, 'property'));
    console.log('missing variable:', key);
  }
}

function helper(app, file, key) {
  var h = get(app._.asyncHelpers, key);
  var a = get(app._.helpers, key);

  if (!h && !a) {
    set(file.data, key, function () {
      return message(key, 'helper');
    });
    console.log('missing helper:', key);
  }
}

function message(key, type) {
  return '<!-- the `' + key + '` ' + type + ' is undefined! -->'
}
