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
/public_types';

export interface GetProjectConfigRequest {
  androidPackageName?: string;
  iosBundleId?: string;
}

export interface GetProjectConfigResponse {
  authorizedDomains: string[];
}

export async function _getProjectConfig(
  auth: Auth,
  request: GetProjectConfigRequest = {}
): Promise<GetProjectConfigResponse> {
  return _performApiRequest<GetProjectConfigRequest, GetProjectConfigResponse>(
    auth,
    HttpMethod.GET,
    Endpoint.GET_PROJECT_CONFIG,
    request
  );
}
