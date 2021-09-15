/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { act } from 'react-dom/test-utils';

import { UseMultiselectResult } from '../../../../common/useMultiselect';
import { renderWithStorage } from '../../../../testing/renderWithStorage';
import { ActionHeader } from './ActionHeader';

describe('ActionHeader', () => {
  it('allows to delete files', async () => {
    const selected = new Set(['lol.jpg']);

    const clearAll = jest.fn();
    const selection = ({
      selected,
      clearAll,
    } as unknown) as UseMultiselectResult;

    const {
      uploadFile,
      waitForNFiles,
      waitForFilesToBeUploaded,
      getByText,
    } = await renderWithStorage(<ActionHeader selection={selection} />);

    await uploadFile('lol.jpg');
    await waitForFilesToBeUploaded(1);

    await act(async () => {
      await fireEvent.click(getByText('Delete'));
    });

    expect(await waitForNFiles(0)).toBe(true);
    // Clears selection
    expect(clearAll).toHaveBeenCalled();
  });
});
