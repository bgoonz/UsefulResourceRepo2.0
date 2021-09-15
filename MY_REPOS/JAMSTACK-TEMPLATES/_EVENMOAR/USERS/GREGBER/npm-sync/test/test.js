'use strict';

const child_process = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');

process.chdir(__dirname);

rimraf.sync('../node_modules/fake-module');
rimraf.sync('./fake-module/fake-file*');

// Start npm sync.
const npmSync = child_process.exec('../bin/npm-sync fake-module');
npmSync.stdout.pipe(process.stdout);
npmSync.stderr.pipe(process.stderr);

// Count number of installs
let installCount = 0;
npmSync.stdout.on('data', data => {
  if (data.match('fake-module@1.0.0'))
    installCount++;
});

// After 10s, the module had to be installed two times only.
setTimeout(() => {
  if (installCount !== 2)
    throw new Error('Test failed');

  process.exit(0);
}, 10000);

// Add files.
fs.writeFile('./fake-module/fake-file', 'hello');
fs.writeFile('./fake-module/fake-file-2', 'hello');


setTimeout(() => fs.writeFile('./fake-module/fake-file-3', 'hello'), 1000);
