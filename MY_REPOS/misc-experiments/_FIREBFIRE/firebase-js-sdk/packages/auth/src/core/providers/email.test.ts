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
chai-as-promised';

import { ProviderId, SignInMethod } from '../../model/enums';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FirebaseError } from '@firebase/util';

import { EmailAuthProvider } from './email';

use(chaiAsPromised);

describe('core/providers/email', () => {
  describe('.credential', () => {
    it('should return an email & password credential', () => {
      const credential = EmailAuthProvider.credential(
        'some-email',
        'some-password'
      );
      expect(credential._email).to.eq('some-email');
      expect(credential._password).to.eq('some-password');
      expect(credential.providerId).to.eq(ProviderId.PASSWORD);
      expect(credential.signInMethod).to.eq(SignInMethod.EMAIL_PASSWORD);
    });
  });

  describe('.credentialWithLink', () => {
    it('should return an email link credential', () => {
      const continueUrl = 'https://www.example.com/path/to/file?a=1&b=2#c=3';
      const actionLink =
        'https://www.example.com/finishSignIn?' +
        'oobCode=CODE&mode=signIn&apiKey=API_KEY&' +
        'continueUrl=' +
        encodeURIComponent(continueUrl) +
        '&languageCode=en&state=bla';

      const credential = EmailAuthProvider.credentialWithLink(
        'some-email',
        actionLink
      );
      expect(credential._email).to.eq('some-email');
      expect(credential._password).to.eq('CODE');
      expect(credential.providerId).to.eq(ProviderId.PASSWORD);
      expect(credential.signInMethod).to.eq(SignInMethod.EMAIL_LINK);
    });

    context('invalid email link', () => {
      it('should throw an error', () => {
        const actionLink = 'https://www.example.com/finishSignIn?';
        expect(() =>
          EmailAuthProvider.credentialWithLink('some-email', actionLink)
        ).to.throw(FirebaseError, 'Firebase: Error (auth/argument-error)');
      });
    });
  });
});
