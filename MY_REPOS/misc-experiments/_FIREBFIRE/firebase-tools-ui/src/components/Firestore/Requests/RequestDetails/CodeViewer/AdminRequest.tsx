/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { Theme } from '@rmwc/theme';
import { Typography } from '@rmwc/typography';
import React from 'react';

export const ADMIN_REQUEST_MESSAGE = 'Admin requests bypass Firestore rules';

const CodeViewerAdminRequest: React.FC = () => {
  return (
    <Theme use="surface" wrap>
      <div className="Firestore-Requests-Details-Code-Admin-Request-Container">
        <Typography
          use="body2"
          theme="textSecondaryOnBackground"
          className="Firestore-Requests-Details-Code-Admin-Request-Message"
        >
          {ADMIN_REQUEST_MESSAGE}
        </Typography>
      </div>
    </Theme>
  );
};

export default CodeViewerAdminRequest;
