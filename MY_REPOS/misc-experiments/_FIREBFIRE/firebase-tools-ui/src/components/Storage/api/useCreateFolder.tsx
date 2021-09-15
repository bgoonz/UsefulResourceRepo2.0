/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
ucket';

const EMPTY_FOLDER_DATA = `--boundary
Content-Type: application/json

{"contentType":"text/plain"}
--boundary
Content-Type: text/plain

--boundary--`;

export function useCreateFolder() {
  const config = useEmulatorConfig('storage');
  const [bucket] = useBucket();

  async function createFolder(fullPath: string) {
    const normalizedPath = fullPath.replace(/\/+/g, '/').replace(/^\//, '');
    const encodedPath = encodeURIComponent(normalizedPath);

    await fetch(
      `http://${
        config!.hostAndPort
      }/upload/storage/v1/b/${bucket}/o?name=${encodedPath}/`,
      {
        headers: {
          'Content-Type': 'multipart/related; boundary=boundary',
        },
        method: 'POST',
        body: new Blob([EMPTY_FOLDER_DATA]),
      }
    );
  }

  return {
    createFolder,
  };
}
