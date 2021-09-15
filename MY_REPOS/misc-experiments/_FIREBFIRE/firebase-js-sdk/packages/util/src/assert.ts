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
 * Throws an error if the provided assertion is falsy
 */
export const assert = function (assertion: unknown, message: string): void {
  if (!assertion) {
    throw assertionError(message);
  }
};

/**
 * Returns an Error object suitable for throwing.
 */
export const assertionError = function (message: string): Error {
  return new Error(
    'Firebase Database (' +
      CONSTANTS.SDK_VERSION +
      ') INTERNAL ASSERT FAILED: ' +
      message
  );
};
