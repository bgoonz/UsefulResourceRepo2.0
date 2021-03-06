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

  AppConfig,
  FirebaseInstallationsImpl
} from '../interfaces/installation-impl';
import {
  AuthToken,
  CompletedAuthToken,
  InProgressAuthToken,
  InstallationEntry,
  RegisteredInstallationEntry,
  RequestStatus
} from '../interfaces/installation-entry';
import { PENDING_TIMEOUT_MS, TOKEN_EXPIRATION_BUFFER } from '../util/constants';
import { ERROR_FACTORY, ErrorCode, isServerError } from '../util/errors';
import { sleep } from '../util/sleep';
import { remove, set, update } from './idb-manager';

/**
 * Returns a valid authentication token for the installation. Generates a new
 * token if one doesn't exist, is expired or about to expire.
 *
 * Should only be called if the Firebase Installation is registered.
 */
export async function refreshAuthToken(
  installations: FirebaseInstallationsImpl,
  forceRefresh = false
): Promise<CompletedAuthToken> {
  let tokenPromise: Promise<CompletedAuthToken> | undefined;
  const entry = await update(installations.appConfig, oldEntry => {
    if (!isEntryRegistered(oldEntry)) {
      throw ERROR_FACTORY.create(ErrorCode.NOT_REGISTERED);
    }

    const oldAuthToken = oldEntry.authToken;
    if (!forceRefresh && isAuthTokenValid(oldAuthToken)) {
      // There is a valid token in the DB.
      return oldEntry;
    } else if (oldAuthToken.requestStatus === RequestStatus.IN_PROGRESS) {
      // There already is a token request in progress.
      tokenPromise = waitUntilAuthTokenRequest(installations, forceRefresh);
      return oldEntry;
    } else {
      // No token or token expired.
      if (!navigator.onLine) {
        throw ERROR_FACTORY.create(ErrorCode.APP_OFFLINE);
      }

      const inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
      tokenPromise = fetchAuthTokenFromServer(installations, inProgressEntry);
      return inProgressEntry;
    }
  });

  const authToken = tokenPromise
    ? await tokenPromise
    : (entry.authToken as CompletedAuthToken);
  return authToken;
}

/**
 * Call only if FID is registered and Auth Token request is in progress.
 *
 * Waits until the current pending request finishes. If the request times out,
 * tries once in this thread as well.
 */
async function waitUntilAuthTokenRequest(
  installations: FirebaseInstallationsImpl,
  forceRefresh: boolean
): Promise<CompletedAuthToken> {
  // Unfortunately, there is no way of reliably observing when a value in
  // IndexedDB changes (yet, see https://github.com/WICG/indexed-db-observers),
  // so we need to poll.

  let entry = await updateAuthTokenRequest(installations.appConfig);
  while (entry.authToken.requestStatus === RequestStatus.IN_PROGRESS) {
    // generateAuthToken still in progress.
    await sleep(100);

    entry = await updateAuthTokenRequest(installations.appConfig);
  }

  const authToken = entry.authToken;
  if (authToken.requestStatus === RequestStatus.NOT_STARTED) {
    // The request timed out or failed in a different call. Try again.
    return refreshAuthToken(installations, forceRefresh);
  } else {
    return authToken;
  }
}

/**
 * Called only if there is a GenerateAuthToken request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * GenerateAuthToken request.
 *
 * Returns the updated InstallationEntry.
 */
function updateAuthTokenRequest(
  appConfig: AppConfig
): Promise<RegisteredInstallationEntry> {
  return update(appConfig, oldEntry => {
    if (!isEntryRegistered(oldEntry)) {
      throw ERROR_FACTORY.create(ErrorCode.NOT_REGISTERED);
    }

    const oldAuthToken = oldEntry.authToken;
    if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
      return {
        ...oldEntry,
        authToken: { requestStatus: RequestStatus.NOT_STARTED }
      };
    }

    return oldEntry;
  });
}

async function fetchAuthTokenFromServer(
  installations: FirebaseInstallationsImpl,
  installationEntry: RegisteredInstallationEntry
): Promise<CompletedAuthToken> {
  try {
    const authToken = await generateAuthTokenRequest(
      installations,
      installationEntry
    );
    const updatedInstallationEntry: RegisteredInstallationEntry = {
      ...installationEntry,
      authToken
    };
    await set(installations.appConfig, updatedInstallationEntry);
    return authToken;
  } catch (e) {
    if (
      isServerError(e) &&
      (e.customData.serverCode === 401 || e.customData.serverCode === 404)
    ) {
      // Server returned a "FID not found" or a "Invalid authentication" error.
      // Generate a new ID next time.
      await remove(installations.appConfig);
    } else {
      const updatedInstallationEntry: RegisteredInstallationEntry = {
        ...installationEntry,
        authToken: { requestStatus: RequestStatus.NOT_STARTED }
      };
      await set(installations.appConfig, updatedInstallationEntry);
    }
    throw e;
  }
}

function isEntryRegistered(
  installationEntry: InstallationEntry | undefined
): installationEntry is RegisteredInstallationEntry {
  return (
    installationEntry !== undefined &&
    installationEntry.registrationStatus === RequestStatus.COMPLETED
  );
}

function isAuthTokenValid(authToken: AuthToken): boolean {
  return (
    authToken.requestStatus === RequestStatus.COMPLETED &&
    !isAuthTokenExpired(authToken)
  );
}

function isAuthTokenExpired(authToken: CompletedAuthToken): boolean {
  const now = Date.now();
  return (
    now < authToken.creationTime ||
    authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER
  );
}

/** Returns an updated InstallationEntry with an InProgressAuthToken. */
function makeAuthTokenRequestInProgressEntry(
  oldEntry: RegisteredInstallationEntry
): RegisteredInstallationEntry {
  const inProgressAuthToken: InProgressAuthToken = {
    requestStatus: RequestStatus.IN_PROGRESS,
    requestTime: Date.now()
  };
  return {
    ...oldEntry,
    authToken: inProgressAuthToken
  };
}

function hasAuthTokenRequestTimedOut(authToken: AuthToken): boolean {
  return (
    authToken.requestStatus === RequestStatus.IN_PROGRESS &&
    authToken.requestTime + PENDING_TIMEOUT_MS < Date.now()
  );
}
