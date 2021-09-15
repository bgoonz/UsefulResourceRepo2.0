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
../src/language';
import './setup';

// Adapts getUserLanguage tests from packages/auth/test/utils_test.js for TypeScript.
describe('getUserLanguage', () => {
  it('prioritizes navigator.languages', () => {
    expect(
      getUserLanguage({
        languages: ['de', 'en'],
        language: 'en'
      })
    ).to.eq('de');
  });

  it('falls back to navigator.language', () => {
    expect(
      getUserLanguage({
        language: 'en'
      } as NavigatorLanguage)
    ).to.eq('en');
  });

  it('defaults undefined', () => {
    expect(getUserLanguage({} as NavigatorLanguage)).to.be.undefined;
  });
});
