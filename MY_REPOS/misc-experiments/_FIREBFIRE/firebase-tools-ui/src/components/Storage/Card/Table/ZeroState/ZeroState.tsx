/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { useDropzone } from 'react-dropzone';

import { useStorageFiles } from '../../../api/useStorageFiles';
import styles from './ZeroState.module.scss';

export const ZeroState: React.FC = () => {
  const { uploadFiles } = useStorageFiles();

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      await uploadFiles(files);
    },
  });

  return (
    <div className={styles.zeroStateWrapper} {...getRootProps()}>
      {isDragActive ? (
        <Typography use="body2" theme="secondary">
          Drop files here
        </Typography>
      ) : (
        <div>
          <Typography use="body1" theme="secondary" tag="div">
            No files found
          </Typography>
          <Typography use="body2" theme="secondary" tag="div">
            Drag and drop files to upload
          </Typography>
        </div>
      )}

      <input {...getInputProps()} />
    </div>
  );
};
