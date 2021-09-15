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
veOptions } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// @ts-ignore
import virtual from '@rollup/plugin-virtual';

/**
 *
 * @param fileContent
 * @param moduleDirectory - the path to the node_modules folder of the temporary project in npm mode.
 *                          undefined in local mode
 */
export async function bundleWithRollup(
  fileContent: string,
  moduleDirectory?: string
): Promise<string> {
  const resolveOptions: RollupNodeResolveOptions = {
    mainFields: ['esm2017', 'module', 'main']
  };

  if (moduleDirectory) {
    resolveOptions.moduleDirectories = [moduleDirectory];
  }

  const bundle = await rollup.rollup({
    input: 'entry',
    plugins: [
      virtual({
        entry: fileContent
      }),
      resolve(resolveOptions),
      commonjs()
    ]
  });

  const { output } = await bundle.generate({
    format: 'es'
  });
  return output[0].code;
}
