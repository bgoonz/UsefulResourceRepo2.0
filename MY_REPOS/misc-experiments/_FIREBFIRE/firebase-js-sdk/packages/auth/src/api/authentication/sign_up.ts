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
  _performSignInRequest
} from '../index';
import { IdTokenResponse } from '../../model/id_token';
import { Auth } from '../../model/public_types';

export interface SignUpRequest {
  returnSecureToken?: boolean;
  email?: string;
  password?: string;
  tenantId?: string;
}

export interface SignUpResponse extends IdTokenResponse {
  displayName?: string;
  email?: string;
}

export async function signUp(
  auth: Auth,
  request: SignUpRequest
): Promise<SignUpResponse> {
  return _performSignInRequest<SignUpRequest, SignUpResponse>(
    auth,
    HttpMethod.POST,
    Endpoint.SIGN_UP,
    _addTidIfNecessary(auth, request)
  );
}
