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

export const BASE_AUTH_EVENT: AuthEvent = {
  urlResponse: 'url-response',
  eventId: 'event-id',
  type: AuthEventType.SIGN_IN_VIA_POPUP,
  sessionId: 'session-id',
  tenantId: 'tenant-id',
  postBody: 'post-body'
};

export function authEvent(event: Partial<AuthEvent> = {}): AuthEvent {
  return {
    ...BASE_AUTH_EVENT,
    ...event
  };
}
