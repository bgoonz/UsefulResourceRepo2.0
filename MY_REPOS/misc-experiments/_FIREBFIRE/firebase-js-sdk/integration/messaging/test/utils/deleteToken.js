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

module.exports = async (webdriver, token) => {
  console.log('Deleting token: ', token);
  await webdriver.wait(() => {
    return webdriver.executeScript(() => {
      return !!window.__test;
    });
  });

  return webdriver.executeScript(token => {
    return window.__test.triggerDeleteToken(token);
  });
};
