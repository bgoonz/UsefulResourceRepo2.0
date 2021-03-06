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

import { UserInternal } from '../../model/user';
import { AuthErrorCode } from '../errors';

export async function _logoutIfInvalidated<T>(
  user: UserInternal,
  promise: Promise<T>,
  bypassAuthState = false
): Promise<T> {
  if (bypassAuthState) {
    return promise;
  }
  try {
    return await promise;
  } catch (e) {
    if (e instanceof FirebaseError && isUserInvalidated(e)) {
      if (user.auth.currentUser === user) {
        await user.auth.signOut();
      }
    }

    throw e;
  }
}

function isUserInvalidated({ code }: FirebaseError): boolean {
  return (
    code === `auth/${AuthErrorCode.USER_DISABLED}` ||
    code === `auth/${AuthErrorCode.TOKEN_EXPIRED}`
  );
}
