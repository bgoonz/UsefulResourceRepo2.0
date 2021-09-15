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

import { ErrorFactory, ErrorMap } from '@firebase/util';

export const enum AppCheckError {
  USE_BEFORE_ACTIVATION = 'use-before-activation'
}

const ERRORS: ErrorMap<AppCheckError> = {
  [AppCheckError.USE_BEFORE_ACTIVATION]:
    'App Check is being used before activate() is called for FirebaseApp {$appName}. ' +
    'Call activate() before instantiating other Firebase services.'
};

interface ErrorParams {
  [AppCheckError.USE_BEFORE_ACTIVATION]: { appName: string };
}

export const ERROR_FACTORY = new ErrorFactory<AppCheckError, ErrorParams>(
  'appCheck',
  'AppCheck',
  ERRORS
);
