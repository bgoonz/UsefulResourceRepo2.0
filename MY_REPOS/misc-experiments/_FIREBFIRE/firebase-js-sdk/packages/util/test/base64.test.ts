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

describe('base64', () => {
  it('bijective', () => {
    const cases = ['$', '¢', '€', '𐍈']; // 1, 2, 3, and 4 byte characters
    cases.forEach(str => {
      assert.strictEqual(base64Decode(base64Encode(str)), str);
    });
  });
});
