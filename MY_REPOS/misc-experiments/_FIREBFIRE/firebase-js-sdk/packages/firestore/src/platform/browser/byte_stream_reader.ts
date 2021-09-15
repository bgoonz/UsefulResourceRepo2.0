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

/**
 * On web, a `ReadableStream` is wrapped around by a `ByteStreamReader`.
 */
export function toByteStreamReader(
  source: BundleSource,
  bytesPerRead: number
): ReadableStreamReader<Uint8Array> {
  if (source instanceof Uint8Array) {
    return toByteStreamReaderHelper(source, bytesPerRead);
  }
  if (source instanceof ArrayBuffer) {
    return toByteStreamReaderHelper(new Uint8Array(source), bytesPerRead);
  }
  if (source instanceof ReadableStream) {
    return source.getReader();
  }
  throw new Error(
    'Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream'
  );
}
