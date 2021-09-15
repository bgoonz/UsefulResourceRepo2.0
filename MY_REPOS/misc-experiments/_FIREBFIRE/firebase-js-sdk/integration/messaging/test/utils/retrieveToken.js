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

module.exports = async webdriver => {
  console.log('retrieving token from test app');

  await webdriver.wait(() => {
    return webdriver.executeScript(() => {
      return !!window.__test && !!window.__test.token;
    });
  });

  return webdriver.executeScript(() => {
    return window.__test.token;
  });
};
