/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { FormContext, useForm } from 'react-hook-form';

import { renderWithFirestore } from '../testing/FirestoreTestProviders';
import ReferenceEditor from './ReferenceEditor';

const TestForm: React.FC = ({ children }) => {
  const methods = useForm();
  return <FormContext {...methods} children={children} />;
};

it('renders an editor for a document-ref', async () => {
  const onChange = jest.fn();
  const { getByLabelText, getByText } = await renderWithFirestore(
    async (firestore) => (
      <TestForm>
        <ReferenceEditor
          name="foo"
          value={firestore.doc('foo/bar')}
          onChange={onChange}
        />
      </TestForm>
    )
  );

  expect(getByLabelText(/Document path/).value).toBe('foo/bar');

  await act(async () => {
    fireEvent.change(getByLabelText(/Document path/), {
      target: { value: 'foo' },
    });
  });

  expect(onChange).not.toHaveBeenCalled();
  expect(getByText(/Must point to a document/)).not.toBeNull();

  const GOOD_PATH = '/wow/cool';
  await act(async () => {
    fireEvent.change(getByLabelText(/Document path/), {
      target: { value: GOOD_PATH },
    });
  });

  expect(onChange.mock.calls[0][0].path).toBe(GOOD_PATH);
});
