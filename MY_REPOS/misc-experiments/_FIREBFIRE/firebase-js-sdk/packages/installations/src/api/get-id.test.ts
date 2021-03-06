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
sinon';
import * as getInstallationEntryModule from '../helpers/get-installation-entry';
import * as refreshAuthTokenModule from '../helpers/refresh-auth-token';
import {
  RegisteredInstallationEntry,
  RequestStatus
} from '../interfaces/installation-entry';
import { getFakeInstallations } from '../testing/fake-generators';
import '../testing/setup';
import { getId } from './get-id';
import {
  FirebaseInstallationsImpl,
  AppConfig
} from '../interfaces/installation-impl';

const FID = 'disciples-of-the-watch';

describe('getId', () => {
  let installations: FirebaseInstallationsImpl;
  let getInstallationEntrySpy: SinonStub<
    [AppConfig],
    Promise<getInstallationEntryModule.InstallationEntryWithRegistrationPromise>
  >;

  beforeEach(() => {
    installations = getFakeInstallations();

    getInstallationEntrySpy = stub(
      getInstallationEntryModule,
      'getInstallationEntry'
    );
  });

  it('returns the FID in InstallationEntry returned by getInstallationEntry', async () => {
    getInstallationEntrySpy.resolves({
      installationEntry: {
        fid: FID,
        registrationStatus: RequestStatus.NOT_STARTED
      },
      registrationPromise: Promise.resolve({} as RegisteredInstallationEntry)
    });

    const fid = await getId(installations);
    expect(fid).to.equal(FID);
    expect(getInstallationEntrySpy).to.be.calledOnce;
  });

  it('calls refreshAuthToken if the installation is registered', async () => {
    getInstallationEntrySpy.resolves({
      installationEntry: {
        fid: FID,
        registrationStatus: RequestStatus.COMPLETED,
        refreshToken: 'refreshToken',
        authToken: {
          requestStatus: RequestStatus.NOT_STARTED
        }
      }
    });

    const refreshAuthTokenSpy = stub(
      refreshAuthTokenModule,
      'refreshAuthToken'
    ).resolves({
      token: 'authToken',
      expiresIn: 123456,
      requestStatus: RequestStatus.COMPLETED,
      creationTime: Date.now()
    });

    await getId(installations);
    expect(refreshAuthTokenSpy).to.be.calledOnce;
  });
});
