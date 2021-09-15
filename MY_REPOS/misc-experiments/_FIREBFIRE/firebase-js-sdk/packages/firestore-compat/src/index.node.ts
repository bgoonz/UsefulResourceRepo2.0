/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
pp-compat';
import { FirebaseNamespace } from '@firebase/app-types';

import { name, version } from '../package.json';

import { Firestore, IndexedDbPersistenceProvider } from './api/database';
import { configureForFirebase } from './config';

/**
 * Registers the main Firestore Node build with the components framework.
 * Persistence can be enabled via `firebase.firestore().enablePersistence()`.
 */
export function registerFirestore(instance: FirebaseNamespace): void {
  configureForFirebase(
    instance,
    (app, firestoreExp) =>
      new Firestore(app, firestoreExp, new IndexedDbPersistenceProvider())
  );
  instance.registerVersion(name, version, 'node');
}

registerFirestore(firebase as unknown as FirebaseNamespace);
