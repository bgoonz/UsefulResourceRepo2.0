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

 */

export interface FirebaseAppCheckInternal {
  // Get the current AttestationToken. Attaches to the most recent in-flight request if one
  // is present. Returns null if no token is present and no token requests are in-flight.
  getToken(forceRefresh?: boolean): Promise<AppCheckTokenResult>;

  // Registers a listener to changes in the token state. There can be more than one listener
  // registered at the same time for one or more FirebaseAppAttestation instances. The
  // listeners call back on the UI thread whenever the current token associated with this
  // FirebaseAppAttestation changes.
  addTokenListener(listener: AppCheckTokenListener): void;

  // Unregisters a listener to changes in the token state.
  removeTokenListener(listener: AppCheckTokenListener): void;
}

type AppCheckTokenListener = (token: AppCheckTokenResult) => void;

// If the error field is defined, the token field will be populated with a dummy token
interface AppCheckTokenResult {
  readonly token: string;
  readonly error?: Error;
}

export type AppCheckInternalComponentName = 'app-check-internal';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'app-check-internal': FirebaseAppCheckInternal;
  }
}
