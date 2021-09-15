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

  registerVersion,
  SDK_VERSION
} from '@firebase/app';
import { Component, ComponentType } from '@firebase/component';

import { version } from '../package.json';
import { LiteCredentialsProvider } from '../src/api/credentials';
import { setSDKVersion } from '../src/core/version';
import { Firestore } from '../src/lite-api/database';
import { FirestoreSettings } from '../src/lite-api/settings';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'firestore/lite': Firestore;
  }
}

export function registerFirestore(): void {
  setSDKVersion(`${SDK_VERSION}_lite`);
  _registerComponent(
    new Component(
      'firestore/lite',
      (container, { options: settings }: { options?: FirestoreSettings }) => {
        const app = container.getProvider('app').getImmediate()!;
        const firestoreInstance = new Firestore(
          app,
          new LiteCredentialsProvider(container.getProvider('auth-internal'))
        );
        if (settings) {
          firestoreInstance._setSettings(settings);
        }
        return firestoreInstance;
      },
      ComponentType.PUBLIC
    )
  );
  registerVersion('firestore-lite', version, 'node');
}
