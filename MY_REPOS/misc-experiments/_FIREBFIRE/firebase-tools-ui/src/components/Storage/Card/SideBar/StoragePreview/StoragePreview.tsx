/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { Spinner } from '../../../../common/Spinner';
import { StorageFile } from '../../../types';
import styles from './StoragePreview.module.scss';
import { shouldShowPreview, usePreviewUrl } from './usePreviewUrl';

interface StoragePreviewProps {
  file: StorageFile;
}

export const StoragePreview: React.FC<StoragePreviewProps> = ({ file }) => {
  if (!shouldShowPreview(file.contentType)) {
    return null;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <StoragePreviewUnwrapped file={file} />
    </Suspense>
  );
};

export const StoragePreviewUnwrapped: React.FC<StoragePreviewProps> = ({
  file,
}) => {
  const url = usePreviewUrl(file);

  if (!url) {
    return null;
  }

  return <img className={styles.preview} src={url} alt="Preview" />;
};
