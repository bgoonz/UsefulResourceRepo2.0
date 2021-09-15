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

import { BundleSource } from '../util/bundle_reader';
import { DEFAULT_BYTES_PER_READ } from '../util/byte_stream';

import * as browser from './browser/byte_stream_reader';
import * as node from './node/byte_stream_reader';
import * as rn from './rn/byte_stream_reader';

export function toByteStreamReader(
  source: BundleSource,
  bytesPerRead: number = DEFAULT_BYTES_PER_READ
): ReadableStreamReader<Uint8Array> {
  if (isNode()) {
    return node.toByteStreamReader(source, bytesPerRead);
  } else if (isReactNative()) {
    return rn.toByteStreamReader(source, bytesPerRead);
  } else {
    return browser.toByteStreamReader(source, bytesPerRead);
  }
}
