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
'../helpers/refresh-auth-token';
import {
  FirebaseInstallationsImpl,
  AppConfig
} from '../interfaces/installation-impl';
import { Installations } from '../interfaces/public-types';

/**
 * Returns a Firebase Installations auth token, identifying the current
 * Firebase Installation.
 * @param installations - The `Installations` instance.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */
export async function getToken(
  installations: Installations,
  forceRefresh = false
): Promise<string> {
  const installationsImpl = installations as FirebaseInstallationsImpl;
  await completeInstallationRegistration(installationsImpl.appConfig);

  // At this point we either have a Registered Installation in the DB, or we've
  // already thrown an error.
  const authToken = await refreshAuthToken(installationsImpl, forceRefresh);
  return authToken.token;
}

async function completeInstallationRegistration(
  appConfig: AppConfig
): Promise<void> {
  const { registrationPromise } = await getInstallationEntry(appConfig);

  if (registrationPromise) {
    // A createInstallation request is in progress. Wait until it finishes.
    await registrationPromise;
  }
}
