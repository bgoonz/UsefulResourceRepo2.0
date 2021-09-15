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

// This is run from the auth package.json
export default {
  input: ['test/integration/webdriver/static/index.js'],
  output: {
    file: 'test/integration/webdriver/static/dist/bundle.js',
    format: 'esm'
  },
  plugins: [nodeResolve()]
};
