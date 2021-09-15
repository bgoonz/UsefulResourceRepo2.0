/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { TestEmulatorConfigProvider } from '../../common/EmulatorConfigProvider';

export const TestStorageProvider: React.FC = ({ children }) => {
  const projectId = 'UNUSED';
  const hostAndPort = process.env.FIREBASE_STORAGE_EMULATOR_HOST;

  if (!hostAndPort) {
    throw new Error(
      'Provide storage emulator address by setting FIREBASE_STORAGE_EMULATOR_HOST'
    );
  }

  const [host, port] = hostAndPort.split(':');

  return (
    <TestEmulatorConfigProvider
      config={{
        projectId,
        storage: { hostAndPort, host, port: Number(port) },
      }}
    >
      {children}
    </TestEmulatorConfigProvider>
  );
};
