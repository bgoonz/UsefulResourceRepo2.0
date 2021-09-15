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
l/assert';

import { PersistenceTransaction } from './persistence_transaction';
import { SimpleDb, SimpleDbStore, SimpleDbTransaction } from './simple_db';

export class IndexedDbTransaction extends PersistenceTransaction {
  constructor(
    readonly simpleDbTransaction: SimpleDbTransaction,
    readonly currentSequenceNumber: ListenSequenceNumber
  ) {
    super();
  }
}

export function getStore<Key extends IDBValidKey, Value>(
  txn: PersistenceTransaction,
  store: string
): SimpleDbStore<Key, Value> {
  const indexedDbTransaction = debugCast(txn, IndexedDbTransaction);
  return SimpleDb.getStore<Key, Value>(
    indexedDbTransaction.simpleDbTransaction,
    store
  );
}
