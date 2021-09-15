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

import firebase from '@firebase/app-compat';
import { registerMessagingCompat } from './registerMessagingCompat';
import { MessagingCompat } from './messaging-compat';

registerMessagingCompat();
firebase.registerVersion(name, version);

/**
 * Define extension behavior of `registerMessaging`
 */
declare module '@firebase/app-compat' {
  interface FirebaseNamespace {
    messaging: {
      (app?: FirebaseApp): MessagingCompat;
      isSupported(): boolean;
    };
  }
  interface FirebaseApp {
    messaging(): MessagingCompat;
  }
}
