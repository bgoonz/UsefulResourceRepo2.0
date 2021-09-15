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
int8Array,
  decodeBase64 as nodeDecodeBase64
} from './node/base64';

/** Converts a Base64 encoded string to a binary string. */
export function decodeBase64(encoded: string): string {
  // This file is only used under ts-node.
  return nodeDecodeBase64(encoded);
}

/** Converts a Uint8Array to a string. */
export function decodeUint8Array(data: Uint8Array): string {
  // This file is only used under ts-node.
  return nodeDecodeUint8Array(data);
}
