/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { StorageFile, StorageItem } from '../../types';

export function useSelectedFile(
  files: StorageItem[]
): [StorageFile | undefined, (file: StorageFile | undefined) => void] {
  const [selectedFile, setSelectedFile] = useState<StorageFile | undefined>(
    undefined
  );

  const result = selectedFile
    ? files.find((file: StorageItem) => file.fullPath === selectedFile.fullPath)
    : undefined;

  return [result as StorageFile, setSelectedFile];
}
