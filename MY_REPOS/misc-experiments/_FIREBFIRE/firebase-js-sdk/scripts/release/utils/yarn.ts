/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
uire('../../utils');
const ora = require('ora');

export async function reinstallDeps() {
  const spinner = ora(' Reinstalling Dependencies').start();
  await spawn('yarn', null, {
    cwd: root
  });
  spinner.stopAndPersist({
    symbol: '✅'
  });
}

export async function buildPackages() {
  const spinner = ora(' Building Packages').start();
  await spawn('yarn', ['build'], {
    cwd: root,
    stdio: 'inherit'
  });
  await spawn('yarn', ["release:prepare"], {
    cwd: root,
    stdio: 'inherit'
  })
  spinner.stopAndPersist({
    symbol: '✅'
  });
}
