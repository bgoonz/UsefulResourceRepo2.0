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
../../model/id_token';
import { Auth } from '../../model/public_types';

export interface UpdateProfileRequest {
  idToken: string;
  displayName?: string | null;
  photoUrl?: string | null;
  returnSecureToken: boolean;
}

export interface UpdateProfileResponse extends IdTokenResponse {
  displayName?: string | null;
  photoUrl?: string | null;
}

export async function updateProfile(
  auth: Auth,
  request: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  return _performApiRequest<UpdateProfileRequest, UpdateProfileResponse>(
    auth,
    HttpMethod.POST,
    Endpoint.SET_ACCOUNT_INFO,
    request
  );
}
