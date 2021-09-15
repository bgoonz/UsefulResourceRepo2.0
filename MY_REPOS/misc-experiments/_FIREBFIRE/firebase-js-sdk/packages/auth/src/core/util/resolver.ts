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
../model/auth';
import { PopupRedirectResolverInternal } from '../../model/popup_redirect';
import { AuthErrorCode } from '../errors';
import { _assert } from './assert';
import { _getInstance } from './instantiator';

/**
 * Chooses a popup/redirect resolver to use. This prefers the override (which
 * is directly passed in), and falls back to the property set on the auth
 * object. If neither are available, this function errors w/ an argument error.
 */
export function _withDefaultResolver(
  auth: AuthInternal,
  resolverOverride: PopupRedirectResolver | undefined
): PopupRedirectResolverInternal {
  if (resolverOverride) {
    return _getInstance(resolverOverride);
  }

  _assert(auth._popupRedirectResolver, auth, AuthErrorCode.ARGUMENT_ERROR);

  return auth._popupRedirectResolver;
}
