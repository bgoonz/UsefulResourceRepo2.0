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

  CompletedAuthToken,
  RegisteredInstallationEntry
} from '../interfaces/installation-entry';
import { PACKAGE_VERSION } from '../util/constants';
import {
  extractAuthTokenInfoFromResponse,
  getErrorFromResponse,
  getHeadersWithAuth,
  getInstallationsEndpoint,
  retryIfServerError
} from './common';
import {
  FirebaseInstallationsImpl,
  AppConfig
} from '../interfaces/installation-impl';

export async function generateAuthTokenRequest(
  { appConfig, platformLoggerProvider }: FirebaseInstallationsImpl,
  installationEntry: RegisteredInstallationEntry
): Promise<CompletedAuthToken> {
  const endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);

  const headers = getHeadersWithAuth(appConfig, installationEntry);

  // If platform logger exists, add the platform info string to the header.
  const platformLogger = platformLoggerProvider.getImmediate({
    optional: true
  });
  if (platformLogger) {
    headers.append('x-firebase-client', platformLogger.getPlatformInfoString());
  }

  const body = {
    installation: {
      sdkVersion: PACKAGE_VERSION
    }
  };

  const request: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  };

  const response = await retryIfServerError(() => fetch(endpoint, request));
  if (response.ok) {
    const responseValue: GenerateAuthTokenResponse = await response.json();
    const completedAuthToken: CompletedAuthToken = extractAuthTokenInfoFromResponse(
      responseValue
    );
    return completedAuthToken;
  } else {
    throw await getErrorFromResponse('Generate Auth Token', response);
  }
}

function getGenerateAuthTokenEndpoint(
  appConfig: AppConfig,
  { fid }: RegisteredInstallationEntry
): string {
  return `${getInstallationsEndpoint(appConfig)}/${fid}/authTokens:generate`;
}
