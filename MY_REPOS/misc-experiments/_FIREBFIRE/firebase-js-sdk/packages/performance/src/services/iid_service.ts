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

let iid: string | undefined;
let authToken: string | undefined;

export function getIidPromise(
  installationsService: _FirebaseInstallationsInternal
): Promise<string> {
  const iidPromise = installationsService.getId();
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  iidPromise.then((iidVal: string) => {
    iid = iidVal;
  });
  return iidPromise;
}

// This method should be used after the iid is retrieved by getIidPromise method.
export function getIid(): string | undefined {
  return iid;
}

export function getAuthTokenPromise(
  installationsService: _FirebaseInstallationsInternal
): Promise<string> {
  const authTokenPromise = installationsService.getToken();
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  authTokenPromise.then((authTokenVal: string) => {
    authToken = authTokenVal;
  });
  return authTokenPromise;
}

export function getAuthenticationToken(): string | undefined {
  return authToken;
}
