/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
/log';

import { LruGarbageCollector, LruResults } from './lru_garbage_collector';
import { PRIMARY_LEASE_LOST_ERROR_MSG } from './persistence_transaction';

export interface LocalStore {
  collectGarbage(garbageCollector: LruGarbageCollector): Promise<LruResults>;
}

/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err - An error returned by a LocalStore operation.
 * @returns A Promise that resolves after we recovered, or the original error.
 */
export async function ignoreIfPrimaryLeaseLoss(
  err: FirestoreError
): Promise<void> {
  if (
    err.code === Code.FAILED_PRECONDITION &&
    err.message === PRIMARY_LEASE_LOST_ERROR_MSG
  ) {
    logDebug('LocalStore', 'Unexpectedly lost primary lease');
  } else {
    throw err;
  }
}
