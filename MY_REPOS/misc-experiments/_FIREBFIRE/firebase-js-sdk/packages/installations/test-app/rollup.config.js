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
in-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'typescript';

/**
 * Creates an iife build to run with the Test App.
 */
export default [
  {
    input: 'src/api/index.ts',
    output: {
      name: 'FirebaseInstallations',
      file: 'test-app/sdk.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      typescriptPlugin({
        typescript,
        tsconfigOverride: { compilerOptions: { declaration: false } }
      }),
      json(),
      resolve(),
      commonjs(),
      uglify()
    ]
  }
];
