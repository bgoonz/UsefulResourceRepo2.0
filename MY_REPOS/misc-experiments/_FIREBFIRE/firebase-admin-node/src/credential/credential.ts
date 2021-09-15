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

import {
  ServiceAccountCredential, RefreshTokenCredential, getApplicationDefault
} from './credential-internal';
import { credential } from './index';

let globalAppDefaultCred: credential.Credential;
const globalCertCreds: { [key: string]: ServiceAccountCredential } = {};
const globalRefreshTokenCreds: { [key: string]: RefreshTokenCredential } = {};

export const applicationDefault: typeof credential.applicationDefault = (httpAgent?) => {
  if (typeof globalAppDefaultCred === 'undefined') {
    globalAppDefaultCred = getApplicationDefault(httpAgent);
  }
  return globalAppDefaultCred;
}

export const cert: typeof credential.cert = (serviceAccountPathOrObject, httpAgent?) => {
  const stringifiedServiceAccount = JSON.stringify(serviceAccountPathOrObject);
  if (!(stringifiedServiceAccount in globalCertCreds)) {
    globalCertCreds[stringifiedServiceAccount] = new ServiceAccountCredential(serviceAccountPathOrObject, httpAgent);
  }
  return globalCertCreds[stringifiedServiceAccount];
}

export const refreshToken: typeof credential.refreshToken = (refreshTokenPathOrObject, httpAgent) => {
  const stringifiedRefreshToken = JSON.stringify(refreshTokenPathOrObject);
  if (!(stringifiedRefreshToken in globalRefreshTokenCreds)) {
    globalRefreshTokenCreds[stringifiedRefreshToken] = new RefreshTokenCredential(
      refreshTokenPathOrObject, httpAgent);
  }
  return globalRefreshTokenCreds[stringifiedRefreshToken];
}
