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

import {
  MessagePayload,
  NextFn,
  Observer,
  Unsubscribe
} from '../interfaces/public-types';
import { MessagingService } from '../messaging-service';

export function onMessage(
  messaging: MessagingService,
  nextOrObserver: NextFn<MessagePayload> | Observer<MessagePayload>
): Unsubscribe {
  if (!navigator) {
    throw ERROR_FACTORY.create(ErrorCode.AVAILABLE_IN_WINDOW);
  }

  messaging.onMessageHandler = nextOrObserver;

  return () => {
    messaging.onMessageHandler = null;
  };
}
