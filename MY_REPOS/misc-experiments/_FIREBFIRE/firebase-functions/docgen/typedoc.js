/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

const options = {
  tsconfig: '../tsconfig.release.json',
  excludeExternals: true,
  exclude: ['../spec/**/*.ts', '../integration_test/**/*.ts'],
  name: 'Firebase Functions SDK',
  hideGenerator: true,
};

module.exports = options;
