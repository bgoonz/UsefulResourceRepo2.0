/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import {
  CardActionBar,
  CardActionBarActions,
} from '../../../common/CardActionBar';
import AuthFilter from './AuthFilter';
import styles from './AuthHeader.module.scss';
import RefreshButton from './RefreshButton';

export interface AuthHeaderProps {
  onOpenNewUserDialog: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  onOpenNewUserDialog,
}) => {
  return (
    <>
      <CardActionBar>
        <AuthFilter />
        <div className={styles.barActions}>
          <CardActionBarActions>
            <RefreshButton />
            <Button
              className={styles.addUserButton}
              unelevated
              onClick={() => onOpenNewUserDialog()}
            >
              Add user
            </Button>
          </CardActionBarActions>
        </div>
      </CardActionBar>
    </>
  );
};
