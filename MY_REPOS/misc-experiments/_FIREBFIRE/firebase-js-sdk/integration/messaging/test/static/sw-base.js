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

importScripts('../constants.js');
importScripts('../helpers.js');

// HEAD targets served through express
importScripts('/firebase-app.js');
importScripts('/firebase-messaging.js');

firebase.initializeApp(FIREBASE_CONFIG);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log(
    TAG +
      'a background message is received in the background handler hook: ' +
      JSON.stringify(payload) +
      '. Storing it into idb for tests to read...'
  );

  addPayloadToDb(payload);
});
