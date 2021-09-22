'use strict';

var argv = require('minimist')(process.argv.slice(2));
var path = require('path');

var code = c(argv.c) || c(argv._[0]) || c('{while,for}-splice-*');
var fixtures = f(argv.f) || f(argv._[1]) || f('{mid,shallow,short}');

var Suite = require('benchmarked');
var suite = new Suite({
  cwd: __dirname,
  fixtures: fixtures,
  add: code,
  result: false
});

suite.run();

function c(name) {
  return name
    ? 'code/' + name + '.js'
    : null;
}

function f(name) {
  return name
    ? 'fixtures/' + name + '.js'
    : null;
}
