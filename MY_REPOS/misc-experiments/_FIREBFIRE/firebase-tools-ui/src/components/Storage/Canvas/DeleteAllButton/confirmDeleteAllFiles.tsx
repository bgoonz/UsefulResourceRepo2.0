/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { Callout } from '../../../common/Callout';
import { confirm } from '../../../common/DialogQueue';

export const confirmDeleteAllFiles = () => {
  return confirm({
    title: 'Clear all data?',
    body: (
      <div className="Firestore--dialog-body">
        <Callout aside type="warning">
          This will delete all files
        </Callout>
      </div>
    ),
    // hide standard buttons so as to use `danger` button
    acceptLabel: null,
    cancelLabel: null,
    footer: (
      <>
        <DialogButton action="close" type="button" theme="secondary">
          Cancel
        </DialogButton>
        <DialogButton unelevated action="accept" isDefaultAction danger>
          Delete
        </DialogButton>
      </>
    ),
  });
};
