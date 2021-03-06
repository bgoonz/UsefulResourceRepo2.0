/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

import { MessagingService } from '../messaging-service';
import { getTokenInternal } from '../internals/token-manager';
import { updateSwReg } from '../helpers/updateSwReg';
import { updateVapidKey } from '../helpers/updateVapidKey';
import { GetTokenOptions } from '../interfaces/public-types';

export async function getToken(
  messaging: MessagingService,
  options?: GetTokenOptions
): Promise<string> {
  if (!navigator) {
    throw ERROR_FACTORY.create(ErrorCode.AVAILABLE_IN_WINDOW);
  }

  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }

  if (Notification.permission !== 'granted') {
    throw ERROR_FACTORY.create(ErrorCode.PERMISSION_BLOCKED);
  }

  await updateVapidKey(messaging, options?.vapidKey);
  await updateSwReg(messaging, options?.serviceWorkerRegistration);

  return getTokenInternal(messaging);
}
