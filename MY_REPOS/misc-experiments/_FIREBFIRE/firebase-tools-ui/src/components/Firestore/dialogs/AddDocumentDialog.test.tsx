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

import { waitForDialogsToClose } from '../../../test_utils';
import { renderDialogWithFirestore } from '../testing/test_utils';
import { AddDocumentDialog } from './AddDocumentDialog';

it('shows correct title', async () => {
  const { getByText } = await renderDialogWithFirestore(async (firestore) => {
    const collectionRef = firestore.collection('things');
    return (
      <AddDocumentDialog
        open={true}
        collectionRef={collectionRef}
        onValue={() => {}}
      />
    );
  });

  expect(getByText(/Add a document/)).not.toBeNull();
});

it('shows the (disabled) creation path', async () => {
  const { getByLabelText } = await renderDialogWithFirestore(
    async (firestore) => {
      const nestedCollectionRef = firestore.collection('things/1/objects');
      return (
        <AddDocumentDialog
          open={true}
          collectionRef={nestedCollectionRef}
          onValue={() => {}}
        />
      );
    }
  );

  expect(getByLabelText('Parent path').value).toBe('things/1/objects');
  expect(getByLabelText('Parent path').disabled).toBe(true);
});

it('auto generates an id', async () => {
  const { getByLabelText } = await renderDialogWithFirestore(
    async (firestore) => {
      const collectionRef = firestore.collection('things');
      return (
        <AddDocumentDialog
          open={true}
          collectionRef={collectionRef}
          onValue={() => {}}
        />
      );
    }
  );

  expect(getByLabelText('Document ID').value).toMatch(/\w+/);
});

it('provides a document-editor', async () => {
  const { getByLabelText } = await renderDialogWithFirestore(
    async (firestore) => {
      const collectionRef = firestore.collection('things');
      return (
        <AddDocumentDialog
          open={true}
          collectionRef={collectionRef}
          onValue={() => {}}
        />
      );
    }
  );

  expect(getByLabelText('Field')).not.toBe(null);
});

// TODO testing suggests that the button is infact disabed by inspecting the DOM
// but triggering a click event still triggers the underlying event. This is no
// reproducible in the actual GUI.
it.skip('[Save] is disabled with invalid doc-data', async () => {
  const onValue = jest.fn();
  const { getByText, getByLabelText } = await renderDialogWithFirestore(
    async (firestore) => {
      const collectionRef = firestore.collection('things');
      return (
        <AddDocumentDialog
          open={true}
          collectionRef={collectionRef}
          onValue={onValue}
        />
      );
    }
  );

  await act(async () => {
    getByText('Save').click();
  });

  expect(onValue).not.toHaveBeenCalled();
});

it('emits id and parsed data when [Save] is clicked', async () => {
  const onValue = jest.fn();
  const { getByText, getByLabelText } = await renderDialogWithFirestore(
    async (firestore) => {
      const collectionRef = firestore.collection('things');
      return (
        <AddDocumentDialog
          open={true}
          collectionRef={collectionRef}
          onValue={onValue}
        />
      );
    }
  );

  await act(async () => {
    fireEvent.change(getByLabelText('Document ID'), {
      target: { value: 'new-document-id' },
    });
    fireEvent.change(getByLabelText('Field'), {
      target: { value: 'foo' },
    });
    fireEvent.change(getByLabelText('Value'), {
      target: { value: 'bar' },
    });
  });

  act(() => getByText('Save').click());

  await waitForDialogsToClose();

  expect(onValue).toHaveBeenCalledWith({
    id: 'new-document-id',
    data: { foo: 'bar' },
  });
});

it('emits null when [Cancel] is clicked', async () => {
  const onValue = jest.fn();
  const { getByText, getByLabelText } = await renderDialogWithFirestore(
    async (firestore) => {
      const collectionRef = firestore.collection('things');
      return (
        <AddDocumentDialog
          open={true}
          collectionRef={collectionRef}
          onValue={onValue}
        />
      );
    }
  );

  await act(async () => {
    fireEvent.change(getByLabelText('Document ID'), {
      target: { value: 'new-document-id' },
    });
  });

  act(() => getByText('Cancel').click());

  await waitForDialogsToClose();

  expect(onValue).toHaveBeenCalledWith(null);
});
