/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

/**
 * See:
 * - https://mochajs.org/#usage for more information on usage of mocha flags.
 * - https://github.com/karma-runner/karma-mocha for more information on all mocha flags which the
 *   karma runner supports.
 */

const config = {
  require: 'ts-node/register',
  timeout: 5000,
  retries: 5,
  exit: true
};

// use min reporter in CI to make it easy to spot failed tests
if (process.env.CI) {
  config.reporter = 'min';
}

module.exports = config;
