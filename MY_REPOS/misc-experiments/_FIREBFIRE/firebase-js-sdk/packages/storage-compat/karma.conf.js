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
;

module.exports = function (config) {
  const karmaConfig = Object.assign({}, karmaBase, {
    // files to load into karma
    files: getTestFiles(argv),
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha']
  });

  config.set(karmaConfig);
};

function getTestFiles(argv) {
  let unitTestFiles = ['test/unit/*'];
  let integrationTestFiles = ['test/integration/*'];

  if (argv.unit) {
    return unitTestFiles;
  } else if (argv.integration) {
    return integrationTestFiles;
  } else {
    return [...unitTestFiles, ...integrationTestFiles];
  }
}

module.exports.files = getTestFiles(argv);
