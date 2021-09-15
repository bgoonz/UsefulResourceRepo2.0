/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { renderWithStorage } from '../../../../testing/renderWithStorage';
import { StorageHeader } from './StorageHeader';

describe('StorageHeader', () => {
  it('displays copy button', async () => {
    const { getByLabelText } = await renderWithStorage(<StorageHeader />);
    expect(getByLabelText('Copy')).toBeDefined();
  });

  it('displays upload file button', async () => {
    const { getByText } = await renderWithStorage(<StorageHeader />);
    expect(getByText('Upload file')).toBeDefined();
  });
});
