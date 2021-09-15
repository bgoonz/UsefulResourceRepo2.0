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
import { getFunctions } from '@firebase/functions';
import firebase from '@firebase/app-compat';
import '@firebase/functions-compat';

import { TEST_PROJECT_CONFIG } from './util';

firebase.initializeApp(TEST_PROJECT_CONFIG);

const compatFunction = firebase.functions();
const modularFunctions = getFunctions();

describe('Functions compat interop', () => {
  it('Functions compat instance references modular Functions instance', () => {
    expect(getModularInstance(compatFunction)).to.equal(modularFunctions);
  });
});
