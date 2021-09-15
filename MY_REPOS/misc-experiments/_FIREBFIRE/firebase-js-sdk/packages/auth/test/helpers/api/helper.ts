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
T_SCHEME } from '../mock_auth';
import { mock, Route } from '../mock_fetch';

export function endpointUrl(endpoint: Endpoint): string {
  return `${TEST_SCHEME}://${TEST_HOST}${endpoint}?key=${TEST_KEY}`;
}

export function mockEndpoint(
  endpoint: Endpoint,
  response: object,
  status = 200
): Route {
  return mock(endpointUrl(endpoint), response, status);
}
