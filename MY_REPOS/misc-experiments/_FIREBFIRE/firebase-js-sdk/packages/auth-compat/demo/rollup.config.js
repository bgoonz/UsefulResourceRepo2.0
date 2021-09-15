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
p/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';

const plugins = [
  sourcemaps(),
  resolveModule(),
  typescriptPlugin({
    typescript,
    include: ['../**/*.ts']
  }),
  json()
];

/**
 * Individual Component Builds
 */
const umdBuilds = [
  /**
   * App UMD Builds
   */
  {
    input: '../../firebase/compat/app/index.ts',
    output: {
      file: 'public/dist/firebase-app.js',
      sourcemap: true,
      format: 'umd',
      name: 'firebase'
    },
    plugins: [...plugins]
  },
  {
    input: `../index.ts`,
    output: {
      file: `public/dist/firebase-auth.js`,
      format: 'umd',
      sourcemap: true,
      extend: true,
      name: 'firebase',
      globals: {
        '@firebase/app-compat': 'firebase',
        '@firebase/app': 'firebase.INTERNAL.modularAPIs'
      },
      /**
       * use iife to avoid below error in the old Safari browser
       * SyntaxError: Functions cannot be declared in a nested block in strict mode
       * https://github.com/firebase/firebase-js-sdk/issues/1228
       *
       */
      intro: `
          try {
            (function() {`,
      outro: `
          }).apply(this, arguments);
        } catch(err) {
            console.error(err);
            throw new Error(
              'Cannot instantiate firebase-auth.js - ' +
              'be sure to load firebase-app.js first.'
            );
          }`
    },
    plugins: [...plugins],
    external: ['@firebase/app-compat', '@firebase/app']
  }
];

export default [...umdBuilds];
