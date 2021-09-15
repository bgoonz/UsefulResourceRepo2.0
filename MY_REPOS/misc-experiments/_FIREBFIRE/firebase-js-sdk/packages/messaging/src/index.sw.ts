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
import { registerMessagingInSw } from './helpers/register';

export * from './interfaces/public-types';
export {
  onBackgroundMessage,
  getMessagingInSw as getMessaging,
  experimentalSetDeliveryMetricsExportedToBigQueryEnabled
} from './api';
export { isSwSupported as isSupported } from './api/isSupported';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'messaging-sw': Messaging;
  }
}

registerMessagingInSw();
