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

const expect = require('chai').expect;
const testServer = require('./utils/test-server');
const retrieveToken = require('./utils/retrieveToken');
const seleniumAssistant = require('selenium-assistant');
const createPermittedWebDriver = require('./utils/createPermittedWebDriver');

const TEST_DOMAIN = 'valid-manifest';
const TEST_SUITE_TIMEOUT_MS = 70000;

// Getting and deleting token is the entry step of using FM SDK. Let it run first and fail quickly.
require('./test-token-delete');

describe(`Firebase Messaging Integration Tests > Use 'use valid manifest`, function () {
  this.timeout(TEST_SUITE_TIMEOUT_MS);

  let globalWebDriver;

  before(async function () {
    await testServer.start();
  });

  after(async function () {
    await testServer.stop();
    await seleniumAssistant.killWebDriver(globalWebDriver);
  });

  it(`should allow valid manifest`, async function () {
    globalWebDriver = createPermittedWebDriver('chrome');
    await globalWebDriver.get(`${testServer.serverAddress}/${TEST_DOMAIN}/`);

    // If we have a token, then we know the default SW + Manifest worked.
    const token = await retrieveToken(globalWebDriver);
    expect(token).to.exist;
  });
});
