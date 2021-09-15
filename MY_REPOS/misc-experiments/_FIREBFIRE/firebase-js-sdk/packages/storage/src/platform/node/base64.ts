/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
/../implementation/error';

/** Converts a Base64 encoded string to a binary string. */
export function decodeBase64(encoded: string): string {
  // Node actually doesn't validate base64 strings.
  // A quick sanity check that is not a fool-proof validation
  if (/[^-A-Za-z0-9+/=]/.test(encoded)) {
    throw invalidFormat('base64', 'Invalid character found');
  }
  return Buffer.from(encoded, 'base64').toString('binary');
}

export function decodeUint8Array(data: Uint8Array): string {
  return new TextDecoder().decode(data);
}
