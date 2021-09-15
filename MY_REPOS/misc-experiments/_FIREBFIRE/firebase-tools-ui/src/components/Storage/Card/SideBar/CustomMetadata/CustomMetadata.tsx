/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { Accordion } from '../../../../common/Accordion';
import styles from './CustomMetadata.module.scss';

interface SideBarProps {
  metadata?: Record<string, string>;
}

export const CustomMetadata: React.FC<SideBarProps> = ({ metadata }) => {
  return (
    <Accordion title="Custom metadata">
      {metadata ? (
        <dl className={styles.metadata}>
          {Object.entries<string>(metadata).map(([key, value]) => (
            <React.Fragment key={key}>
              <Typography use="body2" tag="dt" theme="secondary">
                {key}
              </Typography>
              <Typography use="body2" tag="dd">
                {value}
              </Typography>
            </React.Fragment>
          ))}
        </dl>
      ) : (
        <Typography use="body2" theme="secondary">
          No custom metadata
        </Typography>
      )}
    </Accordion>
  );
};
