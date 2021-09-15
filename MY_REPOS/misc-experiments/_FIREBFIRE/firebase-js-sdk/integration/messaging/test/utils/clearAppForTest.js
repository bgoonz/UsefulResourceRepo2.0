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

module.exports = async webDriver => {
  console.log('Clearing received messaged and errors from the test app.');

  await webDriver.wait(() => {
    return webDriver.executeScript(() => {
      return !!window.__test;
    });
  });

  return webDriver.executeScript(() => {
    return window.__test.clearInstanceForTest();
  });
};
