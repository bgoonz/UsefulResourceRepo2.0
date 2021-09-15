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

import { DataSnapshot } from './Reference';

export class TransactionResult {
  /**
   * A type for the resolve value of Firebase.transaction.
   */
  constructor(public committed: boolean, public snapshot: DataSnapshot) {}

  // Do not create public documentation. This is intended to make JSON serialization work but is otherwise unnecessary
  // for end-users
  toJSON(): object {
    validateArgCount('TransactionResult.toJSON', 0, 1, arguments.length);
    return { committed: this.committed, snapshot: this.snapshot.toJSON() };
  }
}
