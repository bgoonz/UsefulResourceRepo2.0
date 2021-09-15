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

export interface SignInWithCustomTokenRequest {
  token: string;
  returnSecureToken: boolean;
  tenantId?: string;
}

export interface SignInWithCustomTokenResponse extends IdTokenResponse {}

export async function signInWithCustomToken(
  auth: Auth,
  request: SignInWithCustomTokenRequest
): Promise<SignInWithCustomTokenResponse> {
  return _performSignInRequest<
    SignInWithCustomTokenRequest,
    SignInWithCustomTokenResponse
  >(
    auth,
    HttpMethod.POST,
    Endpoint.SIGN_IN_WITH_CUSTOM_TOKEN,
    _addTidIfNecessary(auth, request)
  );
}
