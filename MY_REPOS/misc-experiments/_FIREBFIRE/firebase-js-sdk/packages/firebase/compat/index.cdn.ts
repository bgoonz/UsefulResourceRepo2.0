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
velopment build of the Firebase JS SDK.
When deploying Firebase apps to production, it is advisable to only import
the individual SDK components you intend to use.

For the CDN builds, these are available in the following manner
(replace <PACKAGE> with the name of a component - i.e. auth, database, etc):

https://www.gstatic.com/firebasejs/5.0.0/firebase-<PACKAGE>.js
`);

import '@firebase/polyfill';
import firebase from './app';
import { name, version } from '../package.json';

import './analytics';
import './app-check';
import './auth';
import './database';
import './firestore';
import './functions';
import './messaging';
import './storage';
import './performance';
import './remote-config';

firebase.registerVersion(name, version, 'compat-cdn');

export default firebase;
