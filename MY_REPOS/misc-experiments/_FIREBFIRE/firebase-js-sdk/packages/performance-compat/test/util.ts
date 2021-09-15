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

  FirebasePerformance,
  PerformanceTrace
} from '@firebase/performance';

export function getFakeApp(): FirebaseApp {
  return {
    name: 'appName',
    options: {
      apiKey: 'apiKey',
      projectId: 'projectId',
      authDomain: 'authDomain',
      messagingSenderId: 'messagingSenderId',
      databaseURL: 'databaseUrl',
      storageBucket: 'storageBucket',
      appId: '1:777777777777:web:d93b5ca1475efe57'
    },
    automaticDataCollectionEnabled: true,
    delete: async () => {}
  };
}

export function getFakeModularPerformance(): FirebasePerformance {
  return {
    instrumentationEnabled: true,
    dataCollectionEnabled: true
  };
}

export function getFakeModularPerformanceTrace(): PerformanceTrace {
  return {} as PerformanceTrace;
}
