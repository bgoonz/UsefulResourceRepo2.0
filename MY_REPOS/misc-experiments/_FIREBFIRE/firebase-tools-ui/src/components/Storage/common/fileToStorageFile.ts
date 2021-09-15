/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

export function fileToStorageFile(
  file: File,
  bucket: string,
  folder: string
): StorageFile {
  return {
    type: 'file',
    name: file.name,
    size: file.size,
    contentType: file.type,
    bucket,
    fullPath: folder + '/' + file.name,
    uploading: true,
    updated: new Date().toUTCString(),
    timeCreated: new Date().toUTCString(),
    customMetadata: {},
  } as StorageFile;
}
