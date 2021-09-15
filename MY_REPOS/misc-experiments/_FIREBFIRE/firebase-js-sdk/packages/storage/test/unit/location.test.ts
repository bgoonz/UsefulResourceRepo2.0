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
rc/implementation/location';

describe('Firebase Storage > Location', () => {
  it('makeFromUrl handles an emulator url correctly', () => {
    const loc = Location.makeFromUrl(
      'http://localhost:3001/v0/b/abcdefg.appspot.com/o/abcde.txt',
      'localhost:3001'
    );
    expect(loc.bucket).to.equal('abcdefg.appspot.com');
  });
  it('makeFromUrl handles a Firebase Storage url correctly', () => {
    const loc = Location.makeFromUrl(
      'https://firebasestorage.googleapis.com/v0/b/abcdefgh.appspot.com/o/abcde.txt',
      DEFAULT_HOST
    );
    expect(loc.bucket).to.equal('abcdefgh.appspot.com');
  });
  it('makeFromUrl handles a gs url correctly', () => {
    const loc = Location.makeFromUrl(
      'gs://mybucket/child/path/abcde.txt',
      DEFAULT_HOST
    );
    expect(loc.bucket).to.equal('mybucket');
  });
  it('makeFromUrl handles a Cloud Storage url correctly', () => {
    const loc = Location.makeFromUrl(
      'https://storage.googleapis.com/mybucket/abcde.txt',
      DEFAULT_HOST
    );
    expect(loc.bucket).to.equal('mybucket');
  });
});
