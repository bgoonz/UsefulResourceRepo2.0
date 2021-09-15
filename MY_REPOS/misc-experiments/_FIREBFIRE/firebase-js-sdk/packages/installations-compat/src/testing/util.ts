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
irebase/installations';

const appName = 'testApp';
const apiKey = 'AIzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaA';
const projectId = 'fis-test-app';
const appId = '1:777777777777:web:aaaaaaaaaaaaaaaa';

export function getFakeApp(): FirebaseApp {
  return {
    name: appName,
    options: {
      apiKey,
      projectId,
      authDomain: 'authDomain',
      messagingSenderId: 'messagingSenderId',
      databaseURL: 'databaseUrl',
      storageBucket: 'storageBucket',
      appId
    },
    automaticDataCollectionEnabled: true,
    delete: async () => {},
    installations: (() => null as unknown) as any
  };
}

export function getFakeInstallations(): Installations {
  return {
    app: getFakeApp(),
    appConfig: {
      appName,
      projectId,
      apiKey,
      appId
    },
    platformLoggerProvider: null,
    _delete: () => Promise.resolve()
  } as Installations;
}
