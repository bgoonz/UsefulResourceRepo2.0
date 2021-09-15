/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

/**
 * Common plugins for all builds
 */
const commonPlugins = [
  strip({
    functions: ['debugAssert.*']
  })
];

const es5Builds = [
  /**
   * Browser Builds
   */
  {
    input: 'src/index.js',
    output: [{ file: 'www/dist/bundle.js', format: 'esm', sourcemap: true }],
    plugins: [
      ...commonPlugins,
      resolve({
        mainFields: ['module', 'main']
      })
    ]
  }
];

export default [...es5Builds];
