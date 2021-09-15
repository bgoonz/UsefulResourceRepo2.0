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
import React from 'react';

import { AuthUser, providerToIconMap } from '../../types';
import styles from './ProviderCell.module.scss';

export interface ProviderCellProps {
  user: AuthUser;
}

export const ProviderCell: React.FC<ProviderCellProps> = ({
  user,
}: ProviderCellProps) => {
  return (
    <Theme use="secondary">
      <div className={styles.iconWrapper}>
        {user.providerUserInfo.map(
          (providerInfo) =>
            providerToIconMap[providerInfo.providerId] && (
              <Icon
                icon={providerToIconMap[providerInfo.providerId]}
                key={providerInfo.providerId}
                aria-label={providerInfo.providerId}
              />
            )
        )}
      </div>
    </Theme>
  );
};
