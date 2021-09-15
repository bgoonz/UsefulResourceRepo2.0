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

}

export interface FirebaseAuthInternal {
  getToken(refreshToken?: boolean): Promise<FirebaseAuthTokenData | null>;
  getUid(): string | null;
  addAuthTokenListener(fn: (token: string | null) => void): void;
  removeAuthTokenListener(fn: (token: string | null) => void): void;
}

export type FirebaseAuthInternalName = 'auth-internal';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'auth-internal': FirebaseAuthInternal;
  }
}
