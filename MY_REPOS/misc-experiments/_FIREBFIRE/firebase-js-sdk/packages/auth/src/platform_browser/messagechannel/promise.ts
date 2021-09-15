/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
T> {
  fulfilled: true;
  value: T;
}

interface PromiseRejectedResult {
  fulfilled: false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reason: any;
}

export type PromiseSettledResult<T> =
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult;

/**
 * Shim for Promise.allSettled, note the slightly different format of `fulfilled` vs `status`.
 *
 * @param promises - Array of promises to wait on.
 */
export function _allSettled<T>(
  promises: Array<Promise<T>>
): Promise<Array<PromiseSettledResult<T>>> {
  return Promise.all(
    promises.map(async promise => {
      try {
        const value = await promise;
        return {
          fulfilled: true,
          value
        } as PromiseFulfilledResult<T>;
      } catch (reason) {
        return {
          fulfilled: false,
          reason
        } as PromiseRejectedResult;
      }
    })
  );
}
