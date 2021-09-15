const { ncp } = require('ncp');
const { join, resolve } = require('path');
const { ensureDirSync } = require('fs-extra');

const clientDir = resolve(join(process.cwd(), 'client', 'dist', 'client'));
const serverDir = resolve(join(process.cwd(), 'server', 'dist', 'static'));

ensureDirSync(serverDir);

function copy() {
  return new Promise((resolve, reject) => {
    ncp(clientDir, serverDir, err => {
      err ? reject() : resolve();
    });
  });
}

copy();
