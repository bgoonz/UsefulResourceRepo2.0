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

  Endpoint,
  HttpMethod,
  _addTidIfNecessary
} from '../index';
import { IdTokenResponse } from '../../model/id_token';
import { Auth } from '../../model/public_types';

export interface SignInWithEmailLinkRequest {
  email: string;
  oobCode: string;
  tenantId?: string;
}

export interface SignInWithEmailLinkResponse extends IdTokenResponse {
  email: string;
  isNewUser: boolean;
}

export async function signInWithEmailLink(
  auth: Auth,
  request: SignInWithEmailLinkRequest
): Promise<SignInWithEmailLinkResponse> {
  return _performSignInRequest<
    SignInWithEmailLinkRequest,
    SignInWithEmailLinkResponse
  >(
    auth,
    HttpMethod.POST,
    Endpoint.SIGN_IN_WITH_EMAIL_LINK,
    _addTidIfNecessary(auth, request)
  );
}

export interface SignInWithEmailLinkForLinkingRequest
  extends SignInWithEmailLinkRequest {
  idToken: string;
}

export async function signInWithEmailLinkForLinking(
  auth: Auth,
  request: SignInWithEmailLinkForLinkingRequest
): Promise<SignInWithEmailLinkResponse> {
  return _performSignInRequest<
    SignInWithEmailLinkForLinkingRequest,
    SignInWithEmailLinkResponse
  >(
    auth,
    HttpMethod.POST,
    Endpoint.SIGN_IN_WITH_EMAIL_LINK,
    _addTidIfNecessary(auth, request)
  );
}
