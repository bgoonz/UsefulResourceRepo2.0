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

import {
  Endpoint,
  HttpMethod,
  _addTidIfNecessary,
  _performApiRequest
} from '../index';
import { IdTokenResponse } from '../../model/id_token';
import { MfaEnrollment } from './mfa';

export interface ResetPasswordRequest {
  oobCode: string;
  newPassword?: string;
  tenantId?: string;
}

export interface ResetPasswordResponse {
  email: string;
  newEmail?: string;
  requestType?: ActionCodeOperation;
  mfaInfo?: MfaEnrollment;
}

export async function resetPassword(
  auth: Auth,
  request: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  return _performApiRequest<ResetPasswordRequest, ResetPasswordResponse>(
    auth,
    HttpMethod.POST,
    Endpoint.RESET_PASSWORD,
    _addTidIfNecessary(auth, request)
  );
}
export interface UpdateEmailPasswordRequest {
  idToken: string;
  returnSecureToken?: boolean;
  email?: string;
  password?: string;
}

export interface UpdateEmailPasswordResponse extends IdTokenResponse {}

export async function updateEmailPassword(
  auth: Auth,
  request: UpdateEmailPasswordRequest
): Promise<UpdateEmailPasswordResponse> {
  return _performApiRequest<
    UpdateEmailPasswordRequest,
    UpdateEmailPasswordResponse
  >(auth, HttpMethod.POST, Endpoint.SET_ACCOUNT_INFO, request);
}

export interface ApplyActionCodeRequest {
  oobCode: string;
  tenantId?: string;
}

export interface ApplyActionCodeResponse {}

export async function applyActionCode(
  auth: Auth,
  request: ApplyActionCodeRequest
): Promise<ApplyActionCodeResponse> {
  return _performApiRequest<ApplyActionCodeRequest, ApplyActionCodeResponse>(
    auth,
    HttpMethod.POST,
    Endpoint.SET_ACCOUNT_INFO,
    _addTidIfNecessary(auth, request)
  );
}
