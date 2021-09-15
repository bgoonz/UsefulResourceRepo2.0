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
script-eslint/no-require-imports
const platform = require(`./${process.env.TEST_PLATFORM ?? 'node'}/base64`);

/** Converts a Base64 encoded string to a binary string. */
export function decodeBase64(encoded: string): string {
  return platform.decodeBase64(encoded);
}

/** Converts a binary string to a Base64 encoded string. */
export function encodeBase64(raw: string): string {
  return platform.encodeBase64(raw);
}

/**
 * True if and only if the Base64 conversion functions are available.
 * @internal
 */
export function isBase64Available(): boolean {
  return platform.isBase64Available();
}
