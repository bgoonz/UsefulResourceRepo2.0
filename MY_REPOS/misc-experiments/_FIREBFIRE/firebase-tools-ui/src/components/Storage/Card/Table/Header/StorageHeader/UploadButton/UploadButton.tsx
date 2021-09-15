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

import { useStorageFiles } from '../../../../../api/useStorageFiles';
import styles from './UploadButton.module.scss';

export const UploadButton: React.FC = () => {
  const { uploadFiles } = useStorageFiles();

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: async (files) => {
      await uploadFiles(files);
    },
  });

  return (
    <div className={styles.uploadButton} {...getRootProps()}>
      <Button unelevated>Upload file</Button>
      <input aria-label="Upload" {...getInputProps()} />
    </div>
  );
};
