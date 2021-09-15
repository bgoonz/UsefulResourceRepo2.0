/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

import { getModularInstance } from '@firebase/util';
import { expect } from 'chai';
import { getRemoteConfig } from '@firebase/remote-config';
import firebase from '@firebase/app-compat';
import '@firebase/remote-config-compat';

import { TEST_PROJECT_CONFIG } from './util';

firebase.initializeApp(TEST_PROJECT_CONFIG);

const compatRC = firebase.remoteConfig();
const modularRC = getRemoteConfig();

describe('RC compat interop', () => {
  it('RC compat instance references modular RC instance', () => {
    expect(getModularInstance(compatRC)).to.equal(modularRC);
  });
});
