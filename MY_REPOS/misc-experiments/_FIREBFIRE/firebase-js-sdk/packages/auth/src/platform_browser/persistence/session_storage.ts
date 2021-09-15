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

import {
  PersistenceInternal as InternalPersistence,
  PersistenceType,
  StorageEventListener
} from '../../core/persistence';
import { BrowserPersistenceClass } from './browser';

class BrowserSessionPersistence
  extends BrowserPersistenceClass
  implements InternalPersistence
{
  static type: 'SESSION' = 'SESSION';

  constructor() {
    super(window.sessionStorage, PersistenceType.SESSION);
  }

  _addListener(_key: string, _listener: StorageEventListener): void {
    // Listeners are not supported for session storage since it cannot be shared across windows
    return;
  }

  _removeListener(_key: string, _listener: StorageEventListener): void {
    // Listeners are not supported for session storage since it cannot be shared across windows
    return;
  }
}

/**
 * An implementation of {@link Persistence} of `SESSION` using `sessionStorage`
 * for the underlying storage.
 *
 * @public
 */
export const browserSessionPersistence: Persistence = BrowserSessionPersistence;
