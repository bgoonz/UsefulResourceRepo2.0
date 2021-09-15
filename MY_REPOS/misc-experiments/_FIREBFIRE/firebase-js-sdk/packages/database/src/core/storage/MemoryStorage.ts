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

/**
 * An in-memory storage implementation that matches the API of DOMStorageWrapper
 * (TODO: create interface for both to implement).
 */
export class MemoryStorage {
  private cache_: { [k: string]: unknown } = {};

  set(key: string, value: unknown | null) {
    if (value == null) {
      delete this.cache_[key];
    } else {
      this.cache_[key] = value;
    }
  }

  get(key: string): unknown {
    if (contains(this.cache_, key)) {
      return this.cache_[key];
    }
    return null;
  }

  remove(key: string) {
    delete this.cache_[key];
  }

  isInMemoryStorage = true;
}
