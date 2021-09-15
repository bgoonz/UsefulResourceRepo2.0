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

import { useStorageFiles } from '../../api/useStorageFiles';
import styles from './TableDropzoneWrapper.module.scss';

export const TableDropzoneWrapper: React.FC = ({ children }) => {
  const { uploadFiles } = useStorageFiles();

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: async (files) => {
      await uploadFiles(files);
    },
  });

  return (
    <div {...getRootProps()}>
      {isDragActive ? (
        <div className={styles.dropzoneWrapper}>
          <>{children}</>
          <Typography
            use="body2"
            className={styles.dropWrapper}
            theme="secondary"
          >
            Drop files here
          </Typography>
        </div>
      ) : (
        <>{children}</>
      )}

      <input {...getInputProps()} />
    </div>
  );
};
