/*!
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

import { PrefixedFirebaseError } from '../utils/error';

export type SecurityRulesErrorCode =
  'already-exists'
  | 'authentication-error'
  | 'internal-error'
  | 'invalid-argument'
  | 'invalid-server-response'
  | 'not-found'
  | 'resource-exhausted'
  | 'service-unavailable'
  | 'unknown-error';

export class FirebaseSecurityRulesError extends PrefixedFirebaseError {
  constructor(code: SecurityRulesErrorCode, message: string) {
    super('security-rules', code, message);
  }
}
