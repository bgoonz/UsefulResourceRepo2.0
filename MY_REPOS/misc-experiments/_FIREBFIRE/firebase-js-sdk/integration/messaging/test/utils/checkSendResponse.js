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
const expect = require('chai').expect;

module.exports = response => {
  expect(response).to.exist;
  expect(response.success).to.equal(1);
};
