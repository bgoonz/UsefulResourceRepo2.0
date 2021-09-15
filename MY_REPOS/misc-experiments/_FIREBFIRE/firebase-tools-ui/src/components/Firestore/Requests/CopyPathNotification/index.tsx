/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { Snackbar } from '@rmwc/snackbar';
import React from 'react';

export const SNACKBAR_MESSAGE = 'Request path copied to clipboard';

interface Props {
  showCopyNotification: boolean;
  setShowCopyNotification: (value: boolean) => void;
  timeout?: number;
}

const CopyPathNotification: React.FC<Props> = ({
  showCopyNotification,
  setShowCopyNotification,
  timeout,
}) => (
  <Snackbar
    className="Firestore-Requests-Copy-Path-Snackbar"
    open={showCopyNotification}
    onClose={() => setShowCopyNotification(false)}
    message={SNACKBAR_MESSAGE}
    icon={{ icon: 'check_circle', size: 'medium' }}
    timeout={timeout}
  />
);

export default CopyPathNotification;
