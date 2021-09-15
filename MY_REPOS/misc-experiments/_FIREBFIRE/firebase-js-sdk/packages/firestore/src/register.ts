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

import { name, version } from '../package.json';
import { FirebaseCredentialsProvider } from '../src/api/credentials';
import { setSDKVersion } from '../src/core/version';

import { Firestore } from './api/database';
import { PrivateSettings } from './lite-api/settings';

export function registerFirestore(variant?: string): void {
  setSDKVersion(SDK_VERSION);
  _registerComponent(
    new Component(
      'firestore',
      (container, { options: settings }: { options?: PrivateSettings }) => {
        const app = container.getProvider('app').getImmediate()!;
        const firestoreInstance = new Firestore(
          app,
          new FirebaseCredentialsProvider(
            container.getProvider('auth-internal')
          )
        );
        settings = { useFetchStreams: true, ...settings };
        firestoreInstance._setSettings(settings);
        return firestoreInstance;
      },
      ComponentType.PUBLIC
    )
  );
  registerVersion(name, version, variant);
}
