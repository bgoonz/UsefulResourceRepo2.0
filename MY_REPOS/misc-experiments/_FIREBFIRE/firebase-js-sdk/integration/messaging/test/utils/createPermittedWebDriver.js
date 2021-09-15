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

const testServer = require('./test-server');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const CHROME_PREFERENCE_NOTIFICATION_ENABLED = 1;
const SERVER_ADDRESS_SEPARATOR = ',*';

module.exports = browser => {
  const chromePreferences = {
    profile: {
      content_settings: {
        exceptions: {
          notifications: {}
        }
      }
    }
  };
  chromePreferences.profile.content_settings.exceptions.notifications[
    testServer.serverAddress + SERVER_ADDRESS_SEPARATOR
  ] = {
    setting: CHROME_PREFERENCE_NOTIFICATION_ENABLED
  };

  let chromeOptions = new chrome.Options().setUserPreferences(
    chromePreferences
  );

  let driver = new Builder()
    .forBrowser(browser)
    .setChromeOptions(chromeOptions)
    .build();
  return driver;
};
