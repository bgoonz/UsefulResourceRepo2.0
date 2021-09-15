/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { MemoryRouter, Route } from 'react-router-dom';

import { Config } from '../../store/config';
import { TestEmulatorConfigProvider } from '../common/EmulatorConfigProvider';
import { DatabaseRoute, DatabaseRouteContent } from './index';

jest.mock('./DatabaseContainer', () => () => null); // Don't actually connect to db or store.

const sampleConfig: Config = {
  projectId: 'example',
  database: {
    host: 'localhost',
    port: 9000,
    hostAndPort: 'localhost:9000',
  },
};

describe('DatabaseRoute', () => {
  it('renders loading when config is not ready', () => {
    const { getByText } = render(
      <TestEmulatorConfigProvider config={undefined}>
        <DatabaseRoute />
      </TestEmulatorConfigProvider>
    );
    expect(getByText('Realtime Database Emulator Loading...')).not.toBeNull();
  });
  it('renders error when loading config fails', () => {
    const { getByText } = render(
      <TestEmulatorConfigProvider config={null}>
        <DatabaseRoute />
      </TestEmulatorConfigProvider>
    );
    expect(getByText(/not running/)).not.toBeNull();
  });
  it('renders "emulator is off" when config is not present', () => {
    const { getByText } = render(
      <TestEmulatorConfigProvider
        config={{ projectId: 'example' /* no database */ }}
      >
        <DatabaseRoute />
      </TestEmulatorConfigProvider>
    );
    expect(getByText(/not running/)).not.toBeNull();
  });
});

describe('DatabaseRouteContent', () => {
  it('redirects to primary db (the one named after projectId)', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Route exact path={`//${sampleConfig.projectId}/data`}>
          SUCCESS
        </Route>
        <TestEmulatorConfigProvider config={sampleConfig}>
          <DatabaseRouteContent />
        </TestEmulatorConfigProvider>
      </MemoryRouter>
    );
    expect(getByText('SUCCESS')).not.toBeNull();
  });
});
