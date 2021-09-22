'use strict';

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');
var path = require('path');
var mm = require('micromatch').makeRe;

var c = argv.c || argv._[0] || '*';
var f = argv.f || argv._[1] || '*';

/**
 * Sanity check. run to ensure that
 * all fns return a correct result.
 */

fs.readdirSync(__dirname + '/code').forEach(function (fp) {
  var fn = require(path.resolve(__dirname, 'code', fp));
  var name = path.basename(fp, path.extname(fp));
  if (mm(c).test(name) && /\.js/.test(fp)) {

    fs.readdirSync(__dirname + '/fixtures').forEach(function (fixture) {
      var basename = path.basename(fixture, path.extname(fixture));
      if (mm(f).test(basename) && /\.js/.test(fixture)) {
        fixture = path.resolve(__dirname, 'fixtures', fixture);
        console.log(chalk.bold(name) + ':', fn.apply(null, require(fixture)).length);
      }
    });
  }
});
