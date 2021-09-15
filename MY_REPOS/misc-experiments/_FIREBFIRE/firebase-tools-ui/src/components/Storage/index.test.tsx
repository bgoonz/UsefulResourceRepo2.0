/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
om 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { StorageRoute, StorageWrapper } from './index';
import { FakeStorageWrappers } from './testing/FakeStorageWrappers';
import { renderWithStorage } from './testing/renderWithStorage';

describe('Storage Index Page', () => {
  it('renders canvas and card', async () => {
    const { getByText, defaultBucket } = await renderWithStorage(
      <StorageWrapper />
    );
    expect(getByText('Delete all files')).toBeDefined();
    expect(getByText(`gs://${defaultBucket}`)).toBeDefined();
  });
});

describe('Storage Route', () => {
  it('displays the children', async () => {
    const history = createMemoryHistory({ initialEntries: ['/storage'] });

    const wrapperId = 'wrapper-id';
    const { findByTestId } = render(
      <FakeStorageWrappers fallbackTestId={'lol'}>
        <Router history={history}>
          <StorageRoute>
            <div data-testid={wrapperId} />
          </StorageRoute>
        </Router>
      </FakeStorageWrappers>
    );

    await findByTestId(wrapperId);
    expect(history.location.pathname).toMatch(/storage\/bucket.*/);
  });
});
