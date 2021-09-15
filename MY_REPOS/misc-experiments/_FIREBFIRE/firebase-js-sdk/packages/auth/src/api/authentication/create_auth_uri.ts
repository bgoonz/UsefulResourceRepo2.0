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

  HttpMethod,
  _addTidIfNecessary,
  _performApiRequest
} from '../index';
import { Auth } from '../../model/public_types';

export interface CreateAuthUriRequest {
  identifier: string;
  continueUri: string;
  tenantId?: string;
}

export interface CreateAuthUriResponse {
  signinMethods: string[];
}

export async function createAuthUri(
  auth: Auth,
  request: CreateAuthUriRequest
): Promise<CreateAuthUriResponse> {
  return _performApiRequest<CreateAuthUriRequest, CreateAuthUriResponse>(
    auth,
    HttpMethod.POST,
    Endpoint.CREATE_AUTH_URI,
    _addTidIfNecessary(auth, request)
  );
}
