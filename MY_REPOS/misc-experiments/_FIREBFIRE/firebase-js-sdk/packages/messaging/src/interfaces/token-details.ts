/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

  createTime: number;
  /** Does not exist in Safari since it's not using Push API. */
  subscriptionOptions?: SubscriptionOptions;
}

/**
 * Additional options and values required by a Push API subscription.
 */
export interface SubscriptionOptions {
  vapidKey: string;
  swScope: string;
  endpoint: string;
  auth: string;
  p256dh: string;
}
