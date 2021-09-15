/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
ons): Promise<string>;
}

interface GetTokenOptions {
  vapidKey?: string;
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}

export type MessagingInternalComponentName = 'messaging-internal';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'messaging-internal': MessagingInternal;
  }
}
