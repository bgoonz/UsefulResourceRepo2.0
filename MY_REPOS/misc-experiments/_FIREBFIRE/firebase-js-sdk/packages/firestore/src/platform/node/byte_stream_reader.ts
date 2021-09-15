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
 } from '../../util/byte_stream';
import { Code, FirestoreError } from '../../util/error';
import { valueDescription } from '../../util/input_validation';

/**
 * On Node, only supported data source is a `Uint8Array` for now.
 */
export function toByteStreamReader(
  source: BundleSource,
  bytesPerRead: number
): ReadableStreamReader<Uint8Array> {
  if (!(source instanceof Uint8Array)) {
    throw new FirestoreError(
      Code.INVALID_ARGUMENT,
      `NodePlatform.toByteStreamReader expects source to be Uint8Array, got ${valueDescription(
        source
      )}`
    );
  }
  return toByteStreamReaderHelper(source, bytesPerRead);
}
