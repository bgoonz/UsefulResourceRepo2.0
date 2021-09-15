/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { renderWithStorage } from '../testing/renderWithStorage';
import { StorageCanvas } from './Canvas';

describe('Canvas', () => {
  it('displays delete all button button', async () => {
    const { getByText } = await renderWithStorage(<StorageCanvas />);
    expect(getByText('Delete all files')).toBeDefined();
  });

  it('displays bucket dropdown', async () => {
    const { getByLabelText } = await renderWithStorage(<StorageCanvas />);
    expect(getByLabelText('Select bucket')).toBeDefined();
  });
});
