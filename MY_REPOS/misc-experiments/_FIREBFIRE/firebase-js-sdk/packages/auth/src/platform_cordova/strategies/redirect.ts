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

  AuthProvider,
  PopupRedirectResolver,
  User
} from '../../model/public_types';
import {
  _linkWithRedirect,
  _reauthenticateWithRedirect,
  _signInWithRedirect
} from '../../platform_browser/strategies/redirect';

export function signInWithRedirect(
  auth: Auth,
  provider: AuthProvider,
  resolver?: PopupRedirectResolver
): Promise<void> {
  return _signInWithRedirect(auth, provider, resolver) as Promise<void>;
}

export function reauthenticateWithRedirect(
  user: User,
  provider: AuthProvider,
  resolver?: PopupRedirectResolver
): Promise<void> {
  return _reauthenticateWithRedirect(user, provider, resolver) as Promise<void>;
}

export function linkWithRedirect(
  user: User,
  provider: AuthProvider,
  resolver?: PopupRedirectResolver
): Promise<void> {
  return _linkWithRedirect(user, provider, resolver) as Promise<void>;
}
