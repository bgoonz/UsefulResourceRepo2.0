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
;

describe('Simple test', () => {
  it('Should skip this test');
  it('Should test this fxn', () => {
    expect(testFxn()).to.equal(42);
  });
  it('Should test this async thing', async () => {
    // Do some async assertions, you can use `await` syntax if it helps
    const val = await Promise.resolve(42);
    expect(val).to.equal(42);
  });
});
