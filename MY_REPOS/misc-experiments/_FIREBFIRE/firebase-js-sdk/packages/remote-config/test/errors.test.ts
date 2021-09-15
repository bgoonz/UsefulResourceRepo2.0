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
ORY, ErrorCode } from '../src/errors';
import './setup';

describe('hasErrorCode', () => {
  it('defaults false', () => {
    const error = new Error();
    expect(hasErrorCode(error, ErrorCode.REGISTRATION_PROJECT_ID)).to.be.false;
  });
  it('returns true for FirebaseError with given code', () => {
    const error = ERROR_FACTORY.create(ErrorCode.REGISTRATION_PROJECT_ID);
    expect(hasErrorCode(error, ErrorCode.REGISTRATION_PROJECT_ID)).to.be.true;
  });
});
