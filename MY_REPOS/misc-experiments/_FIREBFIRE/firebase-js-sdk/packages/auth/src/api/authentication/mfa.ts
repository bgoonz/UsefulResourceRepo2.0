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
import { IdTokenResponse } from '../../model/id_token';
import { MfaEnrollment } from '../account_management/mfa';
import { SignInWithIdpResponse } from './idp';
import {
  SignInWithPhoneNumberRequest,
  SignInWithPhoneNumberResponse
} from './sms';

export interface FinalizeMfaResponse {
  idToken: string;
  refreshToken: string;
}

/**
 * @internal
 */
export interface IdTokenMfaResponse extends IdTokenResponse {
  mfaPendingCredential?: string;
  mfaInfo?: MfaEnrollment[];
}

export interface StartPhoneMfaSignInRequest {
  mfaPendingCredential: string;
  mfaEnrollmentId: string;
  phoneSignInInfo: {
    recaptchaToken: string;
  };
  tenantId: string | null;
}

export interface StartPhoneMfaSignInResponse {
  phoneResponseInfo: {
    sessionInfo: string;
  };
}

export function startSignInPhoneMfa(
  auth: Auth,
  request: Omit<StartPhoneMfaSignInRequest, 'tenantId'>
): Promise<StartPhoneMfaSignInResponse> {
  return _performApiRequest<
    StartPhoneMfaSignInRequest,
    StartPhoneMfaSignInResponse
  >(auth, HttpMethod.POST, Endpoint.START_PHONE_MFA_SIGN_IN, {
    tenantId: auth.tenantId,
    ...request
  });
}

export interface FinalizePhoneMfaSignInRequest {
  mfaPendingCredential: string;
  phoneVerificationInfo: SignInWithPhoneNumberRequest;
  tenantId: string | null;
}

export interface FinalizePhoneMfaSignInResponse extends FinalizeMfaResponse {}

export function finalizeSignInPhoneMfa(
  auth: Auth,
  request: Omit<FinalizePhoneMfaSignInRequest, 'tenantId'>
): Promise<FinalizePhoneMfaSignInResponse> {
  return _performApiRequest<
    FinalizePhoneMfaSignInRequest,
    FinalizePhoneMfaSignInResponse
  >(auth, HttpMethod.POST, Endpoint.FINALIZE_PHONE_MFA_SIGN_IN, {
    tenantId: auth.tenantId,
    ...request
  });
}

/**
 * @internal
 */
export type PhoneOrOauthTokenResponse =
  | SignInWithPhoneNumberResponse
  | SignInWithIdpResponse
  | IdTokenResponse;
