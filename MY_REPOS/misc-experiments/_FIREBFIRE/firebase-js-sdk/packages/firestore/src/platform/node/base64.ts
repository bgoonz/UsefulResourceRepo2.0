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
rom '../../util/error';

export function decodeBase64(encoded: string): string {
  // Node actually doesn't validate base64 strings.
  // A quick sanity check that is not a fool-proof validation
  if (/[^-A-Za-z0-9+/=]/.test(encoded)) {
    throw new FirestoreError(
      Code.INVALID_ARGUMENT,
      'Not a valid Base64 string: ' + encoded
    );
  }
  return new Buffer(encoded, 'base64').toString('binary');
}

/** Converts a binary string to a Base64 encoded string. */
export function encodeBase64(raw: string): string {
  return new Buffer(raw, 'binary').toString('base64');
}

/** True if and only if the Base64 conversion functions are available. */
export function isBase64Available(): boolean {
  return true;
}
