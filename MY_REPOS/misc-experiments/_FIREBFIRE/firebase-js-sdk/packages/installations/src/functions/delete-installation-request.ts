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
try } from '../interfaces/installation-entry';
import {
  getErrorFromResponse,
  getHeadersWithAuth,
  getInstallationsEndpoint,
  retryIfServerError
} from './common';

export async function deleteInstallationRequest(
  appConfig: AppConfig,
  installationEntry: RegisteredInstallationEntry
): Promise<void> {
  const endpoint = getDeleteEndpoint(appConfig, installationEntry);

  const headers = getHeadersWithAuth(appConfig, installationEntry);
  const request: RequestInit = {
    method: 'DELETE',
    headers
  };

  const response = await retryIfServerError(() => fetch(endpoint, request));
  if (!response.ok) {
    throw await getErrorFromResponse('Delete Installation', response);
  }
}

function getDeleteEndpoint(
  appConfig: AppConfig,
  { fid }: RegisteredInstallationEntry
): string {
  return `${getInstallationsEndpoint(appConfig)}/${fid}`;
}
