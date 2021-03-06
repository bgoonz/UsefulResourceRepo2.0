/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
ton';
import { GridCell } from '@rmwc/grid';
import React from 'react';

import { Callout } from '../common/Callout';
import { CONSOLE_ROOT } from '../common/constants';

const DISMISS_KEY = 'isLocalWarningCalloutDismissed';

export const LocalWarningCallout: React.FC<{
  projectId: string;
}> = ({ projectId }) => {
  const [isDismissed] = useLocalStorage<boolean>(DISMISS_KEY);

  if (isDismissed) {
    return null;
  }

  return (
    <GridCell span={12}>
      <Callout
        type="note"
        actions={
          <>
            <Button
              tag="a"
              href={`${CONSOLE_ROOT}/project/${projectId}/overview`}
              target="_blank"
              label="View project"
            />
            <Button
              label="Dismiss"
              onClick={() => writeStorage(DISMISS_KEY, true)}
            />
          </>
        }
      >
        Remember this is a local environment. Visit the production version of{' '}
        <strong>{projectId}</strong> in the console.
      </Callout>
    </GridCell>
  );
};
