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


import { testAuth, TestAuth } from '../../../test/helpers/mock_auth';
import { GetOobCodeRequest } from '../../api/authentication/email_and_password';
import { _setActionCodeSettingsOnRequest } from './action_code_settings';

describe('core/strategies/action_code_settings', () => {
  let auth: TestAuth;
  const request: GetOobCodeRequest = {};

  beforeEach(async () => {
    auth = await testAuth();
  });

  it('should require a non empty continue URL', () => {
    expect(() =>
      _setActionCodeSettingsOnRequest(auth, request, {
        handleCodeInApp: true,
        iOS: {
          bundleId: 'my-bundle'
        },
        url: '',
        dynamicLinkDomain: 'fdl-domain'
      })
    ).to.throw(FirebaseError, '(auth/invalid-continue-uri)');
  });

  it('should allow undefined dynamic link URL', () => {
    expect(() =>
      _setActionCodeSettingsOnRequest(auth, request, {
        handleCodeInApp: true,
        iOS: {
          bundleId: 'my-´bundle'
        },
        url: 'my-url'
      })
    ).to.not.throw();
  });

  it('should require a non empty dynamic link URL', () => {
    expect(() =>
      _setActionCodeSettingsOnRequest(auth, request, {
        handleCodeInApp: true,
        iOS: {
          bundleId: 'my-´bundle'
        },
        url: 'my-url',
        dynamicLinkDomain: ''
      })
    ).to.throw(FirebaseError, '(auth/invalid-dynamic-link-domain)');
  });

  it('should require a non-empty bundle ID', () => {
    expect(() =>
      _setActionCodeSettingsOnRequest(auth, request, {
        handleCodeInApp: true,
        iOS: {
          bundleId: ''
        },
        url: 'my-url',
        dynamicLinkDomain: 'fdl-domain'
      })
    ).to.throw(FirebaseError, '(auth/missing-ios-bundle-id)');
  });

  it('should require a non-empty package name', () => {
    expect(() =>
      _setActionCodeSettingsOnRequest(auth, request, {
        handleCodeInApp: true,
        android: {
          packageName: ''
        },
        url: 'my-url',
        dynamicLinkDomain: 'fdl-domain'
      })
    ).to.throw(FirebaseError, '(auth/missing-android-pkg-name)');
  });
});
