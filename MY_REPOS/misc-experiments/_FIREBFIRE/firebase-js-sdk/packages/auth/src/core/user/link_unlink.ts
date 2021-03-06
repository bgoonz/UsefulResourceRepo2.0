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

import { deleteLinkedAccounts } from '../../api/account_management/account';
import { UserInternal, UserCredentialInternal } from '../../model/user';
import { AuthCredential } from '../credentials';
import { AuthErrorCode } from '../errors';
import { _assert } from '../util/assert';
import { providerDataAsNames } from '../util/providers';
import { _logoutIfInvalidated } from './invalidation';
import { _reloadWithoutSaving } from './reload';
import { UserCredentialImpl } from './user_credential_impl';
import { getModularInstance } from '@firebase/util';
import { OperationType, ProviderId } from '../../model/enums';

/**
 * Unlinks a provider from a user account.
 *
 * @param user - The user.
 * @param providerId - The provider to unlink.
 *
 * @public
 */
export async function unlink(user: User, providerId: string): Promise<User> {
  const userInternal = getModularInstance(user) as UserInternal;
  await _assertLinkedStatus(true, userInternal, providerId);
  const { providerUserInfo } = await deleteLinkedAccounts(userInternal.auth, {
    idToken: await userInternal.getIdToken(),
    deleteProvider: [providerId]
  });

  const providersLeft = providerDataAsNames(providerUserInfo || []);

  userInternal.providerData = userInternal.providerData.filter(pd =>
    providersLeft.has(pd.providerId)
  );
  if (!providersLeft.has(ProviderId.PHONE)) {
    userInternal.phoneNumber = null;
  }

  await userInternal.auth._persistUserIfCurrent(userInternal);
  return userInternal;
}

export async function _link(
  user: UserInternal,
  credential: AuthCredential,
  bypassAuthState = false
): Promise<UserCredentialInternal> {
  const response = await _logoutIfInvalidated(
    user,
    credential._linkToIdToken(user.auth, await user.getIdToken()),
    bypassAuthState
  );
  return UserCredentialImpl._forOperation(user, OperationType.LINK, response);
}

export async function _assertLinkedStatus(
  expected: boolean,
  user: UserInternal,
  provider: string
): Promise<void> {
  await _reloadWithoutSaving(user);
  const providerIds = providerDataAsNames(user.providerData);

  const code =
    expected === false
      ? AuthErrorCode.PROVIDER_ALREADY_LINKED
      : AuthErrorCode.NO_SUCH_PROVIDER;
  _assert(providerIds.has(provider) === expected, user.auth, code);
}
