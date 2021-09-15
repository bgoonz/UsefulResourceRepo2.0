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

/**
 * Public interface of the Firebase Installations SDK.
 *
 * @public
 */
export interface Installations {
  /**
   * The {@link @firebase/app#FirebaseApp} this `Installations` instance is associated with.
   */
  app: FirebaseApp;
}

/**
 * An interface for Firebase internal SDKs use only.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface _FirebaseInstallationsInternal {
  /**
   * Creates a Firebase Installation if there isn't one for the app and
   * returns the Installation ID.
   */
  getId(): Promise<string>;

  /**
   * Returns an Authentication Token for the current Firebase Installation.
   */
  getToken(forceRefresh?: boolean): Promise<string>;
}

declare module '@firebase/component' {
  interface NameServiceMapping {
    'installations': Installations;
    'installations-internal': _FirebaseInstallationsInternal;
  }
}
