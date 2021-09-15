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
MultiFactorSessionType } from './mfa_session';
import { FinalizeMfaResponse } from '../api/authentication/mfa';
import { AuthInternal } from '../model/auth';

export abstract class MultiFactorAssertionImpl implements MultiFactorAssertion {
  protected constructor(readonly factorId: FactorId) {}

  _process(
    auth: AuthInternal,
    session: MultiFactorSessionImpl,
    displayName?: string | null
  ): Promise<FinalizeMfaResponse> {
    switch (session.type) {
      case MultiFactorSessionType.ENROLL:
        return this._finalizeEnroll(auth, session.credential, displayName);
      case MultiFactorSessionType.SIGN_IN:
        return this._finalizeSignIn(auth, session.credential);
      default:
        return debugFail('unexpected MultiFactorSessionType');
    }
  }

  abstract _finalizeEnroll(
    auth: AuthInternal,
    idToken: string,
    displayName?: string | null
  ): Promise<FinalizeMfaResponse>;
  abstract _finalizeSignIn(
    auth: AuthInternal,
    mfaPendingCredential: string
  ): Promise<FinalizeMfaResponse>;
}
