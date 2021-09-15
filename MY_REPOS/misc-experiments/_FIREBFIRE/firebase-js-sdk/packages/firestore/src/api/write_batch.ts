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
ut_validation';

import { ensureFirestoreConfigured, Firestore } from './database';
import { executeWrite } from './reference_impl';

export { WriteBatch };

/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single {@link WriteBatch}
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A {@link WriteBatch} that can be used to atomically execute multiple
 * writes.
 */
export function writeBatch(firestore: Firestore): WriteBatch {
  firestore = cast(firestore, Firestore);
  ensureFirestoreConfigured(firestore);
  return new WriteBatch(firestore, mutations =>
    executeWrite(firestore, mutations)
  );
}
