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

import { querystring } from '@firebase/util';

import {
  _getFinalTarget,
  _performFetchWithErrorHandling,
  HttpMethod
} from '../index';
import { FetchProvider } from '../../core/util/fetch_provider';
import { Auth } from '../../model/public_types';
import { AuthInternal } from '../../model/auth';

export const enum Endpoint {
  TOKEN = '/v1/token'
}

/** The server responses with snake_case; we convert to camelCase */
interface RequestStsTokenServerResponse {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

export interface RequestStsTokenResponse {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
}

export async function requestStsToken(
  auth: Auth,
  refreshToken: string
): Promise<RequestStsTokenResponse> {
  const response = await _performFetchWithErrorHandling<RequestStsTokenServerResponse>(
    auth,
    {},
    () => {
      const body = querystring({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
      }).slice(1);
      const { tokenApiHost, apiKey } = auth.config;
      const url = _getFinalTarget(
        auth,
        tokenApiHost,
        Endpoint.TOKEN,
        `key=${apiKey}`
      );

      return FetchProvider.fetch()(url, {
        method: HttpMethod.POST,
        headers: {
          'X-Client-Version': (auth as AuthInternal)._getSdkClientVersion(),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      });
    }
  );

  // The response comes back in snake_case. Convert to camel:
  return {
    accessToken: response.access_token,
    expiresIn: response.expires_in,
    refreshToken: response.refresh_token
  };
}
