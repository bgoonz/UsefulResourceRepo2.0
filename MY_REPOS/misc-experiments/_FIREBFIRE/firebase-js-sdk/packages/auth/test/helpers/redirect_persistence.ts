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
om '../../src/core/persistence/in_memory';

/** Helper class for handling redirect persistence */
export class RedirectPersistence extends InMemoryPersistence {
  hasPendingRedirect = false;
  redirectUser: object | null = null;

  async _get<T extends PersistenceValue>(key: string): Promise<T | null> {
    if (key.includes('pendingRedirect')) {
      return this.hasPendingRedirect.toString() as T;
    } else if (key.includes('redirectUser')) {
      return this.redirectUser as T | null;
    }

    throw new Error(`Unexpected redirect persistence key requested: ${key}`);
  }
}
