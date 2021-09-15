/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { renderWithStorage } from '../../../testing/renderWithStorage';
import { ZeroState } from './ZeroState';

describe('ZeroState', () => {
  it('displays the "no files" message', async () => {
    const { getByText } = await renderWithStorage(<ZeroState />);
    expect(getByText('No files found')).toBeDefined();
  });
});
