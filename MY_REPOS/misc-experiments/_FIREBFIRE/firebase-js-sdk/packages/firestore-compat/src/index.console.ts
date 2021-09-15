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
se/component';
import {
  _DatabaseId,
  Firestore as FirestoreExp,
  FirestoreError,
  _EmptyCredentialsProvider
} from '@firebase/firestore';

import {
  Firestore as FirestoreCompat,
  MemoryPersistenceProvider
} from './api/database';

export {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot
} from './api/database';
export { Blob } from './api/blob';
export { GeoPoint } from './api/geo_point';
export { FieldPath } from './api/field_path';
export { FieldValue } from './api/field_value';
export { Timestamp } from './api/timestamp';

export interface FirestoreDatabase {
  projectId: string;
  database?: string;
}

/** Firestore class that exposes the constructor expected by the Console. */
export class Firestore extends FirestoreCompat {
  constructor(
    firestoreDatabase: FirestoreDatabase,
    authProvider: Provider<FirebaseAuthInternalName>
  ) {
    super(
      databaseIdFromFirestoreDatabase(firestoreDatabase),
      new FirestoreExp(
        databaseIdFromFirestoreDatabase(firestoreDatabase),
        new _EmptyCredentialsProvider()
      ),
      new MemoryPersistenceProvider()
    );
  }
}

function databaseIdFromFirestoreDatabase(
  firestoreDatabase: FirestoreDatabase
): _DatabaseId {
  if (!firestoreDatabase.projectId) {
    throw new FirestoreError('invalid-argument', 'Must provide projectId');
  }
  return new _DatabaseId(
    firestoreDatabase.projectId,
    firestoreDatabase.database
  );
}
