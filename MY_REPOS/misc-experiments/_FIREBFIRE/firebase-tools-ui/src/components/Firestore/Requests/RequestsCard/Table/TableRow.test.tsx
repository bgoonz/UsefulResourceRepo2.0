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
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';

import { createFakeFirestoreRequestEvaluation } from '../../../testing/test_utils';
import RequestsTableRow from './TableRow';

const FAKE_EVALUATION_ID = 'first-fake-evaluation';
const FAKE_EVALUATION = createFakeFirestoreRequestEvaluation({
  requestId: FAKE_EVALUATION_ID,
});
const SET_SHOW_COPY_NOTIFICATION = jest.fn();

describe('RequestsTableRow', () => {
  it('redirects to corresponding request details path when clicking table row', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/firestore/requests'],
    });
    const { getByRole } = render(
      <Router history={history}>
        <table>
          <RequestsTableRow
            request={FAKE_EVALUATION}
            requestId={FAKE_EVALUATION_ID}
            setShowCopyNotification={SET_SHOW_COPY_NOTIFICATION}
          />
        </table>
      </Router>
    );
    await act(async () => {
      fireEvent.click(getByRole('row'));
    });
    expect(history.location.pathname).toBe(
      `/firestore/requests/${FAKE_EVALUATION_ID}`
    );
  });
});
