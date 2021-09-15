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
ebase/app';

export function getAppId(firebaseApp: FirebaseApp): string {
  const appId = firebaseApp.options?.appId;
  if (!appId) {
    throw ERROR_FACTORY.create(ErrorCode.NO_APP_ID);
  }
  return appId;
}

export function getProjectId(firebaseApp: FirebaseApp): string {
  const projectId = firebaseApp.options?.projectId;
  if (!projectId) {
    throw ERROR_FACTORY.create(ErrorCode.NO_PROJECT_ID);
  }
  return projectId;
}

export function getApiKey(firebaseApp: FirebaseApp): string {
  const apiKey = firebaseApp.options?.apiKey;
  if (!apiKey) {
    throw ERROR_FACTORY.create(ErrorCode.NO_API_KEY);
  }
  return apiKey;
}
