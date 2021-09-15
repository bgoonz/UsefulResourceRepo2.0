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

import { FirebaseNamespace } from './firebase-namespace';

const firebaseAdmin = new FirebaseNamespace();

// Inject a circular default export to allow users to use both:
//
//   import firebaseAdmin from 'firebase-admin';
//   which becomes: var firebaseAdmin = require('firebase-admin').default;
//
// as well as the more correct:
//
//   import * as firebaseAdmin from 'firebase-admin';
//   which becomes: var firebaseAdmin = require('firebase-admin');
(firebaseAdmin as any).default = firebaseAdmin;

export = firebaseAdmin;
