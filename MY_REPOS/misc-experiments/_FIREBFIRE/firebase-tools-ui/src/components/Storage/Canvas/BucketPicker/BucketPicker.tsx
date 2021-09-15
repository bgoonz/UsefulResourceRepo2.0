/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
m 'react';

import { StorageIcon } from '../../../common/icons';
import { useBucket } from '../../api/useBucket';
import { useBuckets } from '../../api/useBuckets';
import styles from './BucketPicker.module.scss';

export const BucketPicker: React.FC = () => {
  const buckets = useBuckets();
  const [bucket, setBucket] = useBucket();

  return (
    <Select
      icon={<StorageIcon />}
      className={styles.bucketPicker}
      value={bucket}
      aria-label="Select bucket"
      options={buckets}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        setBucket(event.target.value);
      }}
    />
  );
};
