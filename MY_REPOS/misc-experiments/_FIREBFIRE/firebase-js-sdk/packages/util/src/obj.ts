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
roperty.call(obj, key);
}

export function safeGet<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] | undefined {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}

export function isEmpty(obj: object): obj is {} {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

export function map<K extends string, V, U>(
  obj: { [key in K]: V },
  fn: (value: V, key: K, obj: { [key in K]: V }) => U,
  contextObj?: unknown
): { [key in K]: U } {
  const res: Partial<{ [key in K]: U }> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }
  return res as { [key in K]: U };
}

/**
 * Deep equal two objects. Support Arrays and Objects.
 */
export function deepEqual(a: object, b: object): boolean {
  if (a === b) {
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  for (const k of aKeys) {
    if (!bKeys.includes(k)) {
      return false;
    }

    const aProp = (a as Record<string, unknown>)[k];
    const bProp = (b as Record<string, unknown>)[k];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }

  for (const k of bKeys) {
    if (!aKeys.includes(k)) {
      return false;
    }
  }
  return true;
}

function isObject(thing: unknown): thing is object {
  return thing !== null && typeof thing === 'object';
}
