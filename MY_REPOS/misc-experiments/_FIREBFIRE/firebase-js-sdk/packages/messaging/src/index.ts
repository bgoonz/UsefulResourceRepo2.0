/**
 * Firebase Cloud Messaging
 *
 * @packageDocumentation
 */

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

import { Messaging } from './interfaces/public-types';
import { registerMessagingInWindow } from './helpers/register';

export {
  getToken,
  deleteToken,
  onMessage,
  getMessagingInWindow as getMessaging
} from './api';
export { isWindowSupported as isSupported } from './api/isSupported';
export * from './interfaces/public-types';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'messaging': Messaging;
  }
}

registerMessagingInWindow();
