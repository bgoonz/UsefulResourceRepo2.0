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
/package.json';
import { registerFunctions } from './register';
import * as types from '@firebase/functions-types';

registerFunctions();
firebase.registerVersion(name, version);

declare module '@firebase/app-compat' {
  interface FirebaseNamespace {
    functions: {
      (app?: FirebaseApp): types.FirebaseFunctions;
      Functions: typeof types.FirebaseFunctions;
    };
  }
  interface FirebaseApp {
    functions(regionOrCustomDomain?: string): types.FirebaseFunctions;
  }
}
