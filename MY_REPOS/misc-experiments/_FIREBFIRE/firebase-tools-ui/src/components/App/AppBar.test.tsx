/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import { delay } from '../../test_utils';
import { isTabActive } from '../../test_utils';
import { AppBar } from './AppBar';

it('selects the matching nav-tab', async () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/bar']}>
      <AppBar
        routes={[
          {
            label: 'foo',
            path: '/foo',
            showInNav: true,
            component: React.Fragment,
            exact: false,
          },
          {
            label: 'bar',
            path: '/bar',
            showInNav: true,
            component: React.Fragment,
            exact: false,
          },
        ]}
      />
    </MemoryRouter>
  );

  await act(() => delay(300)); // Wait for tab indicator async DOM updates.

  expect(isTabActive(getByText('foo'))).toBe(false);
  expect(isTabActive(getByText('bar'))).toBe(true);
});
