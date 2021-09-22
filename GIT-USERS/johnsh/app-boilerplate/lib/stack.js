'use strict';

var through = require('through2');
var sessionify = require('sessionify');
var render = require('template-render');
var init = require('template-init');
var paths = require('gulp-dest-paths');
var vfs = require('vinyl-fs');
var _ = require('lodash');

/**
 * Local dependencies
 */

var plugins = require('./plugins');
var session = require('./session');

/**
 * Default `src` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('foo plugin');
 * ```
 */

exports.src = function(app, glob, opts) {
  opts = _.merge({}, app.options, opts);
  session.set('src', opts);

  return app.combine([
    vfs.src(glob, opts),
    init(app)(opts)
  ], opts);
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('bar plugin');
 * ```
 */

exports.dest = function (app, dest, opts) {
  var srcOpts = session.get('src') || {};
  opts = _.merge({}, app.options, srcOpts, opts);

  return app.combine([
    paths(dest, opts),
    plugins.lint(app),
    render(app)(opts),
    vfs.dest(dest, opts)
  ], opts);
};
