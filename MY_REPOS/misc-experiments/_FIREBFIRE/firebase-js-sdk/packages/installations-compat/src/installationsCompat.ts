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
rvice } from '@firebase/app-compat';
import {
  Installations,
  deleteInstallations,
  getId,
  getToken,
  IdChangeCallbackFn,
  IdChangeUnsubscribeFn,
  onIdChange
} from '@firebase/installations';

export class InstallationsCompat
  implements FirebaseInstallationsCompat, _FirebaseService
{
  constructor(public app: FirebaseApp, readonly _delegate: Installations) {}

  getId(): Promise<string> {
    return getId(this._delegate);
  }
  getToken(forceRefresh?: boolean): Promise<string> {
    return getToken(this._delegate, forceRefresh);
  }
  delete(): Promise<void> {
    return deleteInstallations(this._delegate);
  }
  onIdChange(callback: IdChangeCallbackFn): IdChangeUnsubscribeFn {
    return onIdChange(this._delegate, callback);
  }
}
