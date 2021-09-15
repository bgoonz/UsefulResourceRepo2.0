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
ase/util';
import { firebase as firebaseNamespace } from './firebaseNamespace';
import { logger } from './logger';
import { registerCoreComponents } from './registerCoreComponents';

// Firebase Lite detection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (isBrowser() && (self as any).firebase !== undefined) {
  logger.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);

  // eslint-disable-next-line
  const sdkVersion = ((self as any).firebase as FirebaseNamespace).SDK_VERSION;
  if (sdkVersion && sdkVersion.indexOf('LITE') >= 0) {
    logger.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `);
  }
}

const firebase = firebaseNamespace;

registerCoreComponents();

// eslint-disable-next-line import/no-default-export
export default firebase;

export { _FirebaseNamespace, _FirebaseService } from './types';
export { FirebaseApp, FirebaseNamespace } from './public-types';
