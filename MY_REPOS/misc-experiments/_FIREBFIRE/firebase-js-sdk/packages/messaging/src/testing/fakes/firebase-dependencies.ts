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

  FirebaseAnalyticsInternalName
} from '@firebase/analytics-interop-types';

import { FirebaseInternalDependencies } from '../../interfaces/internal-dependencies';
import { FirebaseOptions } from '@firebase/app';
import { Provider } from '@firebase/component';
import { _FirebaseInstallationsInternal } from '@firebase/installations';
import { extractAppConfig } from '../../helpers/extract-app-config';

export function getFakeFirebaseDependencies(
  options: FirebaseOptions = {}
): FirebaseInternalDependencies {
  const app = getFakeApp(options);
  return {
    app,
    appConfig: extractAppConfig(app),
    installations: getFakeInstallations(),
    analyticsProvider: getFakeAnalyticsProvider()
  };
}

export function getFakeApp(options: FirebaseOptions = {}): any {
  options = {
    apiKey: 'apiKey',
    projectId: 'projectId',
    authDomain: 'authDomain',
    messagingSenderId: '1234567890',
    databaseURL: 'databaseUrl',
    storageBucket: 'storageBucket',
    appId: '1:777777777777:web:d93b5ca1475efe57',
    ...options
  };
  return {
    name: 'appName',
    options,
    automaticDataCollectionEnabled: true,
    delete: async () => {},
    messaging: (() => null as unknown) as any,
    installations: () => getFakeInstallations()
  };
}

export function getFakeInstallations(): _FirebaseInstallationsInternal {
  return {
    getId: async () => 'FID',
    getToken: async () => 'authToken'
  };
}

export function getFakeAnalyticsProvider(): Provider<FirebaseAnalyticsInternalName> {
  const analytics: FirebaseAnalyticsInternal = {
    logEvent() {}
  };

  return ({
    get: async () => analytics,
    getImmediate: () => analytics
  } as unknown) as Provider<FirebaseAnalyticsInternalName>;
}
