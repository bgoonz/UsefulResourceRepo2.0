/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

describe('StorageFileIcon', () => {
  it('has appropriate icons', async () => {
    expect(getFileIcon('application/csv')).toBe('csv');
    expect(getFileIcon('text/plain')).toBe('drive_document');
  });

  it('has a default icon for unknown formats', async () => {
    expect(getFileIcon('food/pirojok')).toBe('drive_file');
  });
});
