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

  registerVersion,
  SDK_VERSION
} from '@firebase/app';
import { Component, ComponentType } from '@firebase/component';

import { name, version } from '../package.json';
import { setSDKVersion } from '../src/core/version';

import { repoManagerDatabaseFromApp } from './api/Database';

export function registerDatabase(variant?: string): void {
  setSDKVersion(SDK_VERSION);
  _registerComponent(
    new Component(
      'database',
      (container, { instanceIdentifier: url }) => {
        const app = container.getProvider('app').getImmediate()!;
        const authProvider = container.getProvider('auth-internal');
        const appCheckProvider = container.getProvider('app-check-internal');
        return repoManagerDatabaseFromApp(
          app,
          authProvider,
          appCheckProvider,
          url
        );
      },
      ComponentType.PUBLIC
    ).setMultipleInstances(true)
  );
  registerVersion(name, version, variant);
}
