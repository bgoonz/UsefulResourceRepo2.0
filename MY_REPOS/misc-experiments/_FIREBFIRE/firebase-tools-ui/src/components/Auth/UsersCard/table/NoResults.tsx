/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import styles from './UsersTable.module.scss';

export const NoResults: React.FC = () => {
  return (
    <Typography
      use="body2"
      aria-live="polite"
      theme="textSecondaryOnBackground"
      className={styles.noResultsWrapper}
    >
      No results
    </Typography>
  );
};
