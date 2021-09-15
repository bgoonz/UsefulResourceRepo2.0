/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
om 'reactfire';

import { useEmulatedFirebaseApp } from '../../../firebase';
import { useEmulatorConfig } from '../../common/EmulatorConfigProvider';

const FIREBASE_APP_OPTIONS = {};

export const StorageFirebaseAppProvider: React.FC = ({ children }) => {
  const { host, port } = useEmulatorConfig('storage');
  const app = useEmulatedFirebaseApp(
    'storage',
    FIREBASE_APP_OPTIONS,
    useCallback(
      (app) => {
        app.storage().useEmulator(host, port);
      },
      [host, port]
    )
  );

  if (!app) {
    return null;
  }

  return (
    <FirebaseAppProvider firebaseApp={app}>{children}</FirebaseAppProvider>
  );
};
