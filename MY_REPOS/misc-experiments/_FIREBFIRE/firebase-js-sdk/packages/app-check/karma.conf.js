/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
config/karma.base');

const files = [`**/*.test.ts`];

module.exports = function (config) {
  config.set({
    ...karmaBase,
    files,
    preprocessors: { '**/*.ts': ['webpack', 'sourcemap'] },
    frameworks: ['mocha']
  });
};

module.exports.files = files;
