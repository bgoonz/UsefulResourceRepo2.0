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
import { AuthUser } from '../../types';

export const confirmDeleteUser = (user: AuthUser) =>
  confirm({
    title: 'Delete user',
    body: (
      <div className="Firestore--dialog-body">
        <Callout aside type="warning">
          This will delete user with uid {user.localId}
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
