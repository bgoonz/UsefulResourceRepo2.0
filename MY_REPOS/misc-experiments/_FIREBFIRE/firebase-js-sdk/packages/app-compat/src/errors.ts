/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

export const enum AppError {
  NO_APP = 'no-app',
  INVALID_APP_ARGUMENT = 'invalid-app-argument'
}

const ERRORS: ErrorMap<AppError> = {
  [AppError.NO_APP]:
    "No Firebase App '{$appName}' has been created - " +
    'call Firebase App.initializeApp()',
  [AppError.INVALID_APP_ARGUMENT]:
    'firebase.{$appName}() takes either no argument or a ' +
    'Firebase App instance.'
};

type ErrorParams = { [key in AppError]: { appName: string } };

export const ERROR_FACTORY = new ErrorFactory<AppError, ErrorParams>(
  'app-compat',
  'Firebase',
  ERRORS
);
