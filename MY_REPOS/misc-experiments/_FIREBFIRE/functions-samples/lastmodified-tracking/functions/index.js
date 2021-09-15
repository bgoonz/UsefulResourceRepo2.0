/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/**
 * This Function updates the `/lastmodified` with the timestamp of the last write to `/chat/$message`.
 */
exports.touch = functions.database.ref('/chat/{message}').onWrite(
    (change, context) => admin.database().ref('/lastmodified').set(context.timestamp));
