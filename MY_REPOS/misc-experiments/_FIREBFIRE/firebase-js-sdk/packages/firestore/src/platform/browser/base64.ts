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
ded: string): string {
  return atob(encoded);
}

/** Converts a binary string to a Base64 encoded string. */
export function encodeBase64(raw: string): string {
  return btoa(raw);
}

/** True if and only if the Base64 conversion functions are available. */
export function isBase64Available(): boolean {
  return typeof atob !== 'undefined';
}
