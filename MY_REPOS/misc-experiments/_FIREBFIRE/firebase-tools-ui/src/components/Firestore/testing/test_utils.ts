/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { waitForDialogsToOpen } from '../../../test_utils';
import { FirestoreRulesEvaluation } from '../Requests/rules_evaluation_result_model';
import { renderWithFirestore } from './FirestoreTestProviders';

/*
 * Render a component containing a MDC dialog, and wait for the dialog to be
 * fully open. Silences act(...) warnings from RMWC <Dialog>s.
 *
 * This is syntatic sugar for render() and then waitForDialogsToOpen().
 */
export async function renderDialogWithFirestore(
  ui: (firestore: firebase.firestore.Firestore) => Promise<React.ReactElement>
): Promise<RenderResult> {
  const result = await renderWithFirestore(ui);
  await waitForDialogsToOpen(result.container);
  return result;
}

/*
 * Returns a mocked version of a request evaluation, but also a portion of
 * an evaluation can be provided to create a custom request evaluation.
 */
export function createFakeFirestoreRequestEvaluation(
  evaluation?: Partial<FirestoreRulesEvaluation>
): FirestoreRulesEvaluation {
  return {
    outcome: 'allow',
    rulesContext: {
      request: {},
      resource: {
        mapValue: {
          fields: {
            id: {
              stringValue: 'database/(default)/documents/users/foo',
            },
          },
        },
      },
      method: 'get',
      path: 'databases/(default)/documents/users/foo',
      time: new Date().toString(),
    },
    requestId: 'unique_id',
    granularAllowOutcomes: [],
    rules: SAMPLE_RULES,
    time: new Date().toISOString(),
    ...evaluation,
  };
}

const SAMPLE_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    allow read, write: if true;
  }
}
`;
