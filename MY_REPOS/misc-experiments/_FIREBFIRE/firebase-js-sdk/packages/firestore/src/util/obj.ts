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

export interface Dict<V> {
  [stringKey: string]: V;
}

export function objectSize(obj: object): number {
  let count = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      count++;
    }
  }
  return count;
}

export function forEach<V>(
  obj: Dict<V> | undefined,
  fn: (key: string, val: V) => void
): void {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn(key, obj[key]);
    }
  }
}

export function isEmpty<V>(obj: Dict<V>): boolean {
  debugAssert(
    obj != null && typeof obj === 'object',
    'isEmpty() expects object parameter.'
  );
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
