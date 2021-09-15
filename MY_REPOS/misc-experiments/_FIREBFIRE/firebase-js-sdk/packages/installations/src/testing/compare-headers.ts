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

// Trick TS since it's set to target ES5.
declare class HeadersWithEntries extends Headers {
  entries?(): Iterable<[string, string]>;
}

// Chai doesn't check if Headers objects contain the same entries,
// so we need to do that manually.
export function compareHeaders(
  expectedHeaders: HeadersWithEntries,
  actualHeaders: HeadersWithEntries
): void {
  if (
    expectedHeaders.entries === undefined ||
    actualHeaders.entries === undefined
  ) {
    throw new AssertionError('Headers object does not have entries method');
  }

  const expected = new Map(Array.from(expectedHeaders.entries()));
  const actual = new Map(Array.from(actualHeaders.entries()));
  expect(actual).to.deep.equal(expected);
}
