/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { mockTokens } from '../../testing/mockTokens';
import { renderWithStorage } from '../../testing/renderWithStorage';
import { StorageFile } from '../../types';
import { SideBar } from './SideBar';

describe('SideBar', () => {
  async function setup() {
    const file = { name: 'pirojok', fullPath: 'lol.txt' } as StorageFile;
    const close = jest.fn();

    mockTokens();

    const storageFiles = await renderWithStorage(
      <SideBar file={file} closeSidebar={close} />
    );

    return {
      file,
      close,
      ...storageFiles,
    };
  }

  it('displays header by default', async () => {
    const { close, getByLabelText } = await setup();

    expect(close).not.toHaveBeenCalled();

    await act(async () => {
      await fireEvent.click(getByLabelText('Close'));
    });

    expect(close).toHaveBeenCalled();
  });
});
