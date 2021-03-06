/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *


/**
 * This will include all of the test files and compile them as needed
 *
 * Taken from karma-webpack source:
 * https://github.com/webpack-contrib/karma-webpack#alternative-usage
 */

// 'context()' definition requires additional dependency on webpack-env package.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testsContext = (require as any).context(
  '.',
  true,
  /^((?!node).)*\.test$/
);
const browserTests = testsContext
  .keys()
  .filter((file: string) => !file.match(/([\/.])node([\/.])/));
browserTests.forEach(testsContext);
