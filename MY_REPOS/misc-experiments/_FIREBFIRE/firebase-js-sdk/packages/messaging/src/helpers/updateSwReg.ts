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
import { registerDefaultSw } from './registerDefaultSw';

export async function updateSwReg(
  messaging: MessagingService,
  swRegistration?: ServiceWorkerRegistration | undefined
): Promise<void> {
  if (!swRegistration && !messaging.swRegistration) {
    await registerDefaultSw(messaging);
  }

  if (!swRegistration && !!messaging.swRegistration) {
    return;
  }

  if (!(swRegistration instanceof ServiceWorkerRegistration)) {
    throw ERROR_FACTORY.create(ErrorCode.INVALID_SW_REGISTRATION);
  }

  messaging.swRegistration = swRegistration;
}
