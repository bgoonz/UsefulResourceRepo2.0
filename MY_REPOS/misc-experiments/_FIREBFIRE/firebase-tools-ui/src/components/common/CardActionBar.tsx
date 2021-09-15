/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { Theme, ThemeProvider } from '@rmwc/theme';
import classnames from 'classnames';
import React from 'react';

import { grey100 } from '../../colors';

export const CardActionBar: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <ThemeProvider
      options={{ surface: grey100 }}
      className={classnames('CardActionBar', className)}
    >
      <Theme use={['surface']} className="CardActionBar-container" tag="div">
        {children}
      </Theme>
    </ThemeProvider>
  );
};

export const CardActionBarActions: React.FC = ({ children }) => {
  return (
    <>
      <span style={{ flex: '1 auto' }} />
      <div className="CardActionBar-actions">{children}</div>
    </>
  );
};
