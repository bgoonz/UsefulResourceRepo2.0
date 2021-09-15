/**
 * Cloud Storage for Firebase
 *
 * @packageDocumentation
 */

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

import { ConnectionPool } from '../src/implementation/connectionPool';
import { FirebaseStorageImpl } from '../src/service';
import {
  Component,
  ComponentType,
  ComponentContainer,
  InstanceFactoryOptions
} from '@firebase/component';

import { name, version } from '../package.json';

import { FirebaseStorage } from './public-types';
import { STORAGE_TYPE } from './constants';

export { StringFormat } from '../src/implementation/string';
export * from './api';

function factory(
  container: ComponentContainer,
  { instanceIdentifier: url }: InstanceFactoryOptions
): FirebaseStorage {
  const app = container.getProvider('app').getImmediate();
  const authProvider = container.getProvider('auth-internal');
  const appCheckProvider = container.getProvider('app-check-internal');

  return new FirebaseStorageImpl(
    app,
    authProvider,
    appCheckProvider,
    new ConnectionPool(),
    url,
    SDK_VERSION
  );
}

function registerStorage(): void {
  _registerComponent(
    new Component(
      STORAGE_TYPE,
      factory,
      ComponentType.PUBLIC
    ).setMultipleInstances(true)
  );

  registerVersion(name, version);
}

registerStorage();
