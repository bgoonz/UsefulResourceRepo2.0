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
import { confirmDeleteAllFiles } from './confirmDeleteAllFiles';
import { DeleteAllButton } from './DeleteAllButton';

jest.mock('./confirmDeleteAllFiles.tsx');

describe('DeleteAllButton', () => {
  it('deletes all files', async () => {
    const { getByText, uploadFile, waitForNFiles } = await renderWithStorage(
      <DeleteAllButton />
    );

    confirmDeleteAllFiles.mockReturnValueOnce(Promise.resolve(true));

    await uploadFile('lol.txt');

    const button = getByText('Delete all files');
    await waitFor(() => expect(button.parentElement.disabled).not.toBe(true), {
      timeout: true,
    });

    await act(async () => {
      await fireEvent.click(button);
    });

    expect(await waitForNFiles(0)).toBe(true);
  });
});
