/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
e';

import styles from './StorageIcon.module.scss';

export const StorageFolderIcon: React.FC = () => {
  return (
    <Theme use="secondary">
      <Icon icon="folder_open" className={styles.icon} />
    </Theme>
  );
};
