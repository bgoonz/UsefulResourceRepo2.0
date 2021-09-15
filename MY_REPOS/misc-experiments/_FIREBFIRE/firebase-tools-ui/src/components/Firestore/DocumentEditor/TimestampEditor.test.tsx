/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
se';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';

import TimestampEditor from './TimestampEditor';

const TestForm: React.FC = ({ children }) => {
  const methods = useForm();
  return <FormContext {...methods}>{children}</FormContext>;
};

it('renders an editor for a timestamp', async () => {
  const onChange = jest.fn();
  const date = new Date(2000, 0, 2, 10, 30);
  const { getByLabelText, getByText } = render(
    <TestForm>
      <TimestampEditor
        name="foo"
        value={firestore.Timestamp.fromDate(date)}
        onChange={onChange}
      />
    </TestForm>
  );

  const [displayDate, displayTime] = getByLabelText('Value').value.split('T');
  expect(displayDate).toBe('2000-01-02');
  expect(displayTime).toBe('10:30');

  onChange.mockReset();

  await act(async () => {
    fireEvent.change(getByLabelText(/Value/), {
      target: { value: 'foo' },
    });
  });
  expect(onChange).not.toHaveBeenCalled();
  expect(getByText(/Must be a date-time/)).not.toBeNull();

  await act(async () => {
    fireEvent.change(getByLabelText(/Value/), {
      target: { value: '2001-01-02T14:30' },
    });
  });

  expect(onChange).toHaveBeenCalledWith(
    firestore.Timestamp.fromDate(new Date(2001, 0, 2, 14, 30))
  );
});
