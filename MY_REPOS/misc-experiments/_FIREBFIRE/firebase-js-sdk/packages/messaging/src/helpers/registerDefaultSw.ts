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
 } from '../util/errors';

import { MessagingService } from '../messaging-service';

export async function registerDefaultSw(
  messaging: MessagingService
): Promise<void> {
  try {
    messaging.swRegistration = await navigator.serviceWorker.register(
      DEFAULT_SW_PATH,
      {
        scope: DEFAULT_SW_SCOPE
      }
    );

    // The timing when browser updates sw when sw has an update is unreliable from experiment. It
    // leads to version conflict when the SDK upgrades to a newer version in the main page, but sw
    // is stuck with the old version. For example,
    // https://github.com/firebase/firebase-js-sdk/issues/2590 The following line reliably updates
    // sw if there was an update.
    messaging.swRegistration.update().catch(() => {
      /* it is non blocking and we don't care if it failed */
    });
  } catch (e) {
    throw ERROR_FACTORY.create(ErrorCode.FAILED_DEFAULT_REGISTRATION, {
      browserErrorMessage: e.message
    });
  }
}
