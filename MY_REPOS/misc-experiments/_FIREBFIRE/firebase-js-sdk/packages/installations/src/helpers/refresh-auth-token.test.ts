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
ub, stub, useFakeTimers } from 'sinon';
import * as generateAuthTokenRequestModule from '../functions/generate-auth-token-request';
import {
  CompletedAuthToken,
  RegisteredInstallationEntry,
  RequestStatus,
  UnregisteredInstallationEntry
} from '../interfaces/installation-entry';
import { getFakeInstallations } from '../testing/fake-generators';
import '../testing/setup';
import { TOKEN_EXPIRATION_BUFFER } from '../util/constants';
import { sleep } from '../util/sleep';
import { get, set } from './idb-manager';
import { refreshAuthToken } from './refresh-auth-token';
import { FirebaseInstallationsImpl } from '../interfaces/installation-impl';

const FID = 'carry-the-blessed-home';
const AUTH_TOKEN = 'authTokenFromServer';
const DB_AUTH_TOKEN = 'authTokenFromDB';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

describe('refreshAuthToken', () => {
  let installations: FirebaseInstallationsImpl;
  let generateAuthTokenRequestSpy: SinonStub<
    [FirebaseInstallationsImpl, RegisteredInstallationEntry],
    Promise<CompletedAuthToken>
  >;

  beforeEach(() => {
    installations = getFakeInstallations();

    generateAuthTokenRequestSpy = stub(
      generateAuthTokenRequestModule,
      'generateAuthTokenRequest'
    ).callsFake(async () => {
      await sleep(100); // Request would take some time
      const result: CompletedAuthToken = {
        token: AUTH_TOKEN,
        expiresIn: ONE_WEEK_MS,
        requestStatus: RequestStatus.COMPLETED,
        creationTime: Date.now()
      };
      return result;
    });
  });

  it('throws when there is no installation in the DB', async () => {
    await expect(refreshAuthToken(installations)).to.be.rejected;
  });

  it('throws when there is an unregistered installation in the db', async () => {
    const installationEntry: UnregisteredInstallationEntry = {
      fid: FID,
      registrationStatus: RequestStatus.NOT_STARTED
    };
    await set(installations.appConfig, installationEntry);

    await expect(refreshAuthToken(installations)).to.be.rejected;
  });

  describe('when there is a valid auth token in the DB', () => {
    beforeEach(async () => {
      const installationEntry: RegisteredInstallationEntry = {
        fid: FID,
        registrationStatus: RequestStatus.COMPLETED,
        refreshToken: 'refreshToken',
        authToken: {
          token: AUTH_TOKEN,
          expiresIn: ONE_WEEK_MS,
          requestStatus: RequestStatus.COMPLETED,
          creationTime: Date.now()
        }
      };
      await set(installations.appConfig, installationEntry);
    });

    it('returns the token from the DB', async () => {
      const { token } = await refreshAuthToken(installations);
      expect(token).to.equal(AUTH_TOKEN);
    });

    it('does not call any server APIs', async () => {
      await refreshAuthToken(installations);
      expect(generateAuthTokenRequestSpy).not.to.be.called;
    });

    it('works even if the app is offline', async () => {
      stub(navigator, 'onLine').value(false);

      const { token } = await refreshAuthToken(installations);
      expect(token).to.equal(AUTH_TOKEN);
    });
  });

  describe('when there is an auth token that is about to expire in the DB', () => {
    let clock: SinonFakeTimers;

    beforeEach(async () => {
      clock = useFakeTimers({ shouldAdvanceTime: true });

      const installationEntry: RegisteredInstallationEntry = {
        fid: FID,
        registrationStatus: RequestStatus.COMPLETED,
        refreshToken: 'refreshToken',
        authToken: {
          token: DB_AUTH_TOKEN,
          expiresIn: ONE_WEEK_MS,
          requestStatus: RequestStatus.COMPLETED,
          creationTime:
            // Expires in ten minutes
            Date.now() - ONE_WEEK_MS + TOKEN_EXPIRATION_BUFFER + 10 * 60 * 1000
        }
      };
      await set(installations.appConfig, installationEntry);
    });

    it('returns a different token after expiration', async () => {
      const token1 = await refreshAuthToken(installations);
      expect(token1.token).to.equal(DB_AUTH_TOKEN);

      // Wait 30 minutes.
      clock.tick('30:00');

      const token2 = await refreshAuthToken(installations);
      await expect(token2.token).to.equal(AUTH_TOKEN);
      await expect(token2.token).not.to.equal(DB_AUTH_TOKEN);
      expect(generateAuthTokenRequestSpy).to.be.calledOnce;
    });
  });

  describe('when there is an expired auth token in the DB', () => {
    beforeEach(async () => {
      const installationEntry: RegisteredInstallationEntry = {
        fid: FID,
        registrationStatus: RequestStatus.COMPLETED,
        refreshToken: 'refreshToken',
        authToken: {
          token: DB_AUTH_TOKEN,
          expiresIn: ONE_WEEK_MS,
          requestStatus: RequestStatus.COMPLETED,
          creationTime: Date.now() - 2 * ONE_WEEK_MS
        }
      };
      await set(installations.appConfig, installationEntry);
    });

    it('does not call generateAuthToken twice on subsequent calls', async () => {
      await refreshAuthToken(installations);
      await refreshAuthToken(installations);
      expect(generateAuthTokenRequestSpy).to.be.calledOnce;
    });

    it('does not call generateAuthToken twice on simultaneous calls', async () => {
      await Promise.all([
        refreshAuthToken(installations),
        refreshAuthToken(installations)
      ]);
      expect(generateAuthTokenRequestSpy).to.be.calledOnce;
    });

    it('returns a new token', async () => {
      const { token } = await refreshAuthToken(installations);
      await expect(token).to.equal(AUTH_TOKEN);
      await expect(token).not.to.equal(DB_AUTH_TOKEN);
      expect(generateAuthTokenRequestSpy).to.be.calledOnce;
    });

    it('throws if the app is offline', async () => {
      stub(navigator, 'onLine').value(false);

      await expect(refreshAuthToken(installations)).to.be.rejected;
    });

    it('saves the new token in the DB', async () => {
      const { token } = await refreshAuthToken(installations);

      const installationEntry = (await get(
        installations.appConfig
      )) as RegisteredInstallationEntry;
      expect(installationEntry).not.to.be.undefined;
      expect(installationEntry.registrationStatus).to.equal(
        RequestStatus.COMPLETED
      );

      const authToken = installationEntry.authToken as CompletedAuthToken;
      expect(authToken.requestStatus).to.equal(RequestStatus.COMPLETED);
      expect(authToken.token).to.equal(token);
    });
  });
});
