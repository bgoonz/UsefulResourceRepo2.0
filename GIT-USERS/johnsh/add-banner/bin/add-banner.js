#!/usr/bin/env node
// vim: syntax=javascript

const fs = require('fs');
const path = require('path');
const load = require('load-pkg');
const pkg = load.sync(path.join(__dirname, '..'));
const argv = require('minimist')(process.argv.slice(2));
const banner = require('..');

if (argv.version) {
  console.log('add-banner', pkg.version);
  process.exit();
}

if (!argv._[0]) {
  console.error('Command argument for files missing!');
  process.exit(1);
}

argv._.forEach(file => {
  if (fs.writeFile(file, banner(file, argv))) {
    console.log('Banner added to:', file);
  }
});
