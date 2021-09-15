/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { BucketPicker } from './BucketPicker/BucketPicker';
import styles from './Canvas.module.scss';
import { DeleteAllButton } from './DeleteAllButton/DeleteAllButton';

export const StorageCanvas: React.FC = () => (
  <div className={styles.canvasWrapper}>
    <BucketPicker />
    <DeleteAllButton />
  </div>
);
