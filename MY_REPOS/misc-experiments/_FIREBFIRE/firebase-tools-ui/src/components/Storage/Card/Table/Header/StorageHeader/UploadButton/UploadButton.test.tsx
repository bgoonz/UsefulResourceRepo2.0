/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { renderWithStorage } from '../../../../../testing/renderWithStorage';
import { UploadButton } from './UploadButton';

describe('UploadButton', () => {
  it('uploads a file', async () => {
    const { getByLabelText, waitForNFiles } = await renderWithStorage(
      <UploadButton />
    );
    const file = new File([''], 'pirojok.txt');

    const upload = getByLabelText('Upload');

    await act(async () => {
      fireEvent.change(upload, { target: { files: [file] } });
    });

    expect(await waitForNFiles(1)).toBe(true);
  });
});
