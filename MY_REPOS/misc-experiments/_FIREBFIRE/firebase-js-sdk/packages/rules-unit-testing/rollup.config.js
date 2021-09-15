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

import typescript from 'typescript';

const plugins = [
  typescriptPlugin({
    typescript
  })
];

const deps = Object.keys(
  Object.assign({}, pkg.peerDependencies, pkg.dependencies)
);

export default {
  input: 'index.ts',
  output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
  plugins: [...plugins],
  external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
};
