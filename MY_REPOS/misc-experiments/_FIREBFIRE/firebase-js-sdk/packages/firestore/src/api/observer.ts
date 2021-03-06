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
./util/error';

/**
 * Observer/Subscribe interfaces.
 */
export type NextFn<T> = (value: T) => void;
export type ErrorFn = (error: FirestoreError) => void;
export type CompleteFn = () => void;

// Allow for any of the Observer methods to be undefined.
export interface PartialObserver<T> {
  next?: NextFn<T>;
  error?: ErrorFn;
  complete?: CompleteFn;
}

export function isPartialObserver<T>(obj: unknown): obj is PartialObserver<T> {
  return implementsAnyMethods(obj, ['next', 'error', 'complete']);
}

/**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
function implementsAnyMethods(obj: unknown, methods: string[]): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const object = obj as JsonObject<unknown>;
  for (const method of methods) {
    if (method in object && typeof object[method] === 'function') {
      return true;
    }
  }
  return false;
}
