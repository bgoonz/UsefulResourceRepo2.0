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

import { bufferToBase64UrlSafe } from './buffer-to-base64-url-safe';

const str = 'hello world';
const TYPED_ARRAY_REPRESENTATION = new Uint8Array(str.length);
for (let i = 0; i < str.length; i++) {
  TYPED_ARRAY_REPRESENTATION[i] = str.charCodeAt(i);
}

const BASE_64_REPRESENTATION = btoa(str);

describe('bufferToBase64', () => {
  it('returns a base64 representation of a Uint8Array', () => {
    expect(bufferToBase64UrlSafe(TYPED_ARRAY_REPRESENTATION)).to.equal(
      BASE_64_REPRESENTATION
    );
  });
});
