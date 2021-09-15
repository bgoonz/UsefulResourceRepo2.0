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
lup-plugin-typescript2';
import typescript from 'typescript';

import pkg from './package.json';

/**
 * Common plugins for all builds
 */
const commonPlugins = [
  strip({
    functions: ['debugAssert.*']
  })
];

const workerPlugins = [
  ...commonPlugins,
  resolve({
    mainFields: ['webworker', 'module', 'main']
  }),
  typescriptPlugin({
    typescript,
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
        target: 'es2017',
        lib: [
          // TODO: remove this
          'dom',
          'es2015',
          'webworker'
        ]
      }
    }
  })
];

const es5Builds = [
  /**
   * Browser Builds
   */
  {
    input: 'src/index.js',
    output: [{ file: pkg.browser, format: 'esm', sourcemap: true }],
    plugins: [
      ...commonPlugins,
      resolve({
        mainFields: ['module', 'main']
      })
    ]
  },
  {
    input: 'src/worker/web-worker.ts',
    output: [{ file: pkg.webworker, format: 'esm', sourcemap: true }],
    plugins: workerPlugins
  },
  {
    input: 'src/worker/service-worker.ts',
    output: [{ file: pkg.serviceworker, format: 'esm', sourcemap: true }],
    plugins: workerPlugins
  }
];

export default [...es5Builds];
