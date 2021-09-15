/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 endpoints hosted via firebase functions which
 * are used to test service worker functionality for Firebase Auth via demo
 * app.
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.checkIfAuthenticated = functions.https.onRequest((req, res) => {
  const idToken = req.get('x-id-token');
  res.setHeader('Content-Type', 'application/json');
  if (idToken) {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedIdToken => {
        res.status(200).send(JSON.stringify({ uid: decodedIdToken.sub }));
      })
      .catch(error => {
        res.status(400).send(JSON.stringify({ error: error.code }));
      });
  } else {
    res.status(403).send(JSON.stringify({ error: 'Unauthorized access' }));
  }
});
