/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { CircularProgress } from '@rmwc/circular-progress';
import { GridCell } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import classnames from 'classnames';
import React from 'react';

export const Spinner: React.FC<
  {
    message?: string;
    span?: number;
    cover?: boolean;
    scrim?: boolean;
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;
  } & React.HTMLProps<HTMLDivElement>
> = ({ message, size, span, cover, scrim, ...props }) => {
  const children = (
    <>
      <CircularProgress size={size ?? 'xlarge'} />
      {message && (
        <Typography use="body2" tag="p">
          {message}
        </Typography>
      )}
    </>
  );
  if (span === undefined) {
    return (
      <div className={classnames('Spinner', { cover, scrim })} {...props}>
        {children}
      </div>
    );
  } else {
    return (
      <GridCell span={span} align="middle" className="Spinner" {...props}>
        {children}
      </GridCell>
    );
  }
};
