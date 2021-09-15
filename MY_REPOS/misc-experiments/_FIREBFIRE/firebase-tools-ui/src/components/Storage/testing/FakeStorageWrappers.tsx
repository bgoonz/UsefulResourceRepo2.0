/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { StorageFirebaseAppProvider } from '../providers/StorageFirebaseAppProvider';
import { FakeFirebaseRouterProvider } from './FakeFirebaseRouterProvider';
import { TestStorageProvider } from './TestStorageProvider';

export interface StorageTestWrappersProps {
  fallbackTestId: string;
}

export const FakeStorageWrappers: React.FC<StorageTestWrappersProps> = ({
  children,
  fallbackTestId,
}) => {
  return (
    <TestStorageProvider>
      <Suspense fallback={<div data-testid={fallbackTestId} />}>
        <StorageFirebaseAppProvider>
          <FakeFirebaseRouterProvider>{children}</FakeFirebaseRouterProvider>
        </StorageFirebaseAppProvider>
      </Suspense>
    </TestStorageProvider>
  );
};
