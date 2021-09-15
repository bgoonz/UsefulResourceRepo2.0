/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { renderWithStorage } from '../../testing/renderWithStorage';
import { BucketPicker } from './BucketPicker';

describe('Bucket Picker', () => {
  it('updates the URL with selected bucket', async () => {
    const { getByLabelText, current, defaultBucket } = await renderWithStorage(
      <BucketPicker />
    );

    const select = getByLabelText('Select bucket');

    await act(async () => {
      await fireEvent.change(select, { target: { value: defaultBucket } });
    });

    expect(current.history.location.pathname).toBe(`/storage/${defaultBucket}`);
  });
});
