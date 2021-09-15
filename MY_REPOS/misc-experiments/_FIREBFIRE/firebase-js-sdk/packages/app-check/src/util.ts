/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

import { GreCAPTCHA } from './recaptcha';
import { getState } from './state';
import { ERROR_FACTORY, AppCheckError } from './errors';
import { FirebaseApp } from '@firebase/app';

export function getRecaptcha(): GreCAPTCHA | undefined {
  return self.grecaptcha;
}

export function ensureActivated(app: FirebaseApp): void {
  if (!getState(app).activated) {
    throw ERROR_FACTORY.create(AppCheckError.USE_BEFORE_ACTIVATION, {
      appName: app.name
    });
  }
}

/**
 * Copied from https://stackoverflow.com/a/2117523
 */
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
