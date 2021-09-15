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
'../src/service';
import { getFunctions } from '@firebase/functions';

export function createTestService(
  app: FirebaseApp,
  regionOrCustomDomain?: string
): FunctionsService {
  const functions = new FunctionsService(
    app,
    getFunctions(app, regionOrCustomDomain)
  );
  const useEmulator = !!process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST;
  if (useEmulator) {
    functions.useEmulator(
      process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST!,
      Number(process.env.FIREBASE_FUNCTIONS_EMULATOR_PORT!)
    );
  }
  return functions;
}
