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
import { Route, Router } from 'react-router-dom';

import { storagePath } from '../common/constants';
import { usePath } from './usePath';

const bucket = 'pirojok-bucket';
const initialPath = 'pirojok/the/path';

describe('usePath', () => {
  function setup() {
    const history = createMemoryHistory({
      initialEntries: [`/storage/${bucket}/${initialPath}`],
    });

    const Wrapper: React.FC = ({ children }) => {
      return (
        <Router history={history}>
          <Route exact path={storagePath + `:bucket/:path*`}>
            {children}
          </Route>
        </Router>
      );
    };
    const { result } = renderHook(() => usePath(), { wrapper: Wrapper });

    const [path, setPath] = result.current;
    return {
      path,
      setPath,
      history,
    };
  }

  it('picks up path from the URL', async () => {
    const { path } = setup();
    expect(path).toBe(initialPath);
  });

  it('updates the URL', async () => {
    const newPath = 'new/path';
    const { setPath, history } = setup();
    setPath(newPath);
    expect(history.location.pathname).toBe(`/storage/${bucket}/${newPath}`);
  });
});
