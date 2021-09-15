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

import { OperationType } from '../../model/enums';

import { mockEndpoint } from '../../../test/helpers/api/helper';
import { testAuth, testUser, TestAuth } from '../../../test/helpers/mock_auth';
import * as mockFetch from '../../../test/helpers/mock_fetch';
import { Endpoint } from '../../api';
import { APIUserInfo } from '../../api/account_management/account';
import { signInAnonymously } from './anonymous';

describe('core/strategies/anonymous', () => {
  let auth: TestAuth;
  const serverUser: APIUserInfo = {
    localId: 'local-id'
  };

  beforeEach(async () => {
    auth = await testAuth();
    mockFetch.setUp();
    mockEndpoint(Endpoint.SIGN_UP, {
      idToken: 'id-token',
      refreshToken: 'refresh-token',
      expiresIn: '1234',
      localId: serverUser.localId!
    });
    mockEndpoint(Endpoint.GET_ACCOUNT_INFO, {
      users: [serverUser]
    });
  });
  afterEach(mockFetch.tearDown);

  describe('signInAnonymously', () => {
    it('should sign in an anonymous user', async () => {
      const { user, operationType } = await signInAnonymously(auth);
      expect(operationType).to.eq(OperationType.SIGN_IN);
      expect(user.uid).to.eq(serverUser.localId);
      expect(user.isAnonymous).to.be.true;
    });

    context('already signed in anonymously', () => {
      it('should return the current user', async () => {
        const userCredential = await signInAnonymously(auth);
        expect(userCredential.user.isAnonymous).to.be.true;

        const { user, operationType } = await signInAnonymously(auth);
        expect(operationType).to.eq(OperationType.SIGN_IN);
        expect(user.uid).to.eq(userCredential.user.uid);
        expect(user.isAnonymous).to.be.true;
      });
    });

    context('already signed in with a non-anonymous account', () => {
      it('should sign in as a new user user', async () => {
        const fakeUser = testUser(auth, 'other-uid');
        await auth._updateCurrentUser(fakeUser);
        expect(fakeUser.isAnonymous).to.be.false;

        const { user, operationType } = await signInAnonymously(auth);
        expect(operationType).to.eq(OperationType.SIGN_IN);
        expect(user.uid).to.not.eq(fakeUser.uid);
        expect(user.isAnonymous).to.be.true;
      });
    });
  });
});
