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
const path = require('path');

module.exports = {
  'extends': '../../config/.eslintrc.js',
  'parserOptions': {
    'project': 'tsconfig.json',
    'tsconfigRootDir': __dirname
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        'packageDir': [path.resolve(__dirname, '../../'), __dirname]
      }
    ]
  }
};
