/*!
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

import * as firebase from 'firebase-admin';

export function initApp(serviceAcct: any, name: string): firebase.app.App {
  return firebase.initializeApp({
    credential: firebase.credential.cert(serviceAcct),
    databaseURL: 'https://mock.firebaseio.com'
  }, name);
}

export function addValueEventListener(
  // Check for type compilation
  db: firebase.database.Database,
  callback: (s: firebase.database.DataSnapshot) => any): void {
  const eventType: firebase.database.EventType = 'value';
  db.ref().on(eventType, callback);
}

export default initApp;
