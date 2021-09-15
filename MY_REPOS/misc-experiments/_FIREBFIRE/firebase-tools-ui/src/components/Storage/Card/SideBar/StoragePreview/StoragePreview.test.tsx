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
import { StorageFile } from '../../../types';
import { StoragePreviewUnwrapped } from './StoragePreview';
import * as usePreviewUrl from './usePreviewUrl';

describe('StoragePreview', () => {
  const file = {} as StorageFile;
  it('Renders image', async () => {
    jest.spyOn(usePreviewUrl, 'usePreviewUrl').mockReturnValueOnce('LOL');
    const { getByAltText } = await renderWithStorage(
      <StoragePreviewUnwrapped file={file} />
    );
    expect(getByAltText('Preview')).toBeDefined();
  });

  it('does not render the image if preview URL is not present', async () => {
    jest.spyOn(usePreviewUrl, 'usePreviewUrl').mockReturnValueOnce(undefined);
    const { queryByAltText } = await renderWithStorage(
      <StoragePreviewUnwrapped file={file} />
    );
    expect(queryByAltText('Preview')).toBeNull();
  });
});
