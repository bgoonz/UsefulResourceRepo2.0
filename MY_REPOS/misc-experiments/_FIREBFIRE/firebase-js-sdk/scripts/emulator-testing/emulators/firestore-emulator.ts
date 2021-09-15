/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

export class FirestoreEmulator extends Emulator {
  projectId: string;

  constructor(port: number, projectId = 'test-emulator') {
    super(
      'cloud-firestore-emulator-v1.11.7.jar',
      // Use locked version of emulator for test to be deterministic.
      // The latest version can be found from firestore emulator doc:
      // https://firebase.google.com/docs/firestore/security/test-rules-emulator
      'https://storage.googleapis.com/firebase-preview-drop/emulator/cloud-firestore-emulator-v1.11.7.jar',
      port
    );
    this.projectId = projectId;
  }
}
