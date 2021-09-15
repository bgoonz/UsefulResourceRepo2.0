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

 */

const seleniumAssistant = require('selenium-assistant');

console.log('Starting browser download - this may take some time.');
// TODO: enable firefox testing once figure out how to give notification permission with SE
// webdriver. TODO: Run the integration test against multiple major chrome versions to ensure
// backward compatibility
Promise.all([seleniumAssistant.downloadLocalBrowser('chrome', 'stable', 80)])
  .then(() => {
    console.log('Browser download complete.');
  })
  .catch(err => {
    console.error('Browser download failed.');
  });
