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
Observer } from './interfaces/public-types';

import { FirebaseAnalyticsInternalName } from '@firebase/analytics-interop-types';
import { FirebaseInternalDependencies } from './interfaces/internal-dependencies';
import { LogEvent } from './interfaces/logging-types';
import { Provider } from '@firebase/component';
import { _FirebaseInstallationsInternal } from '@firebase/installations';
import { extractAppConfig } from './helpers/extract-app-config';

export class MessagingService implements _FirebaseService {
  readonly app!: FirebaseApp;
  readonly firebaseDependencies!: FirebaseInternalDependencies;

  swRegistration?: ServiceWorkerRegistration;
  vapidKey?: string;
  // logging is only done with end user consent. Default to false.
  deliveryMetricsExportedToBigQueryEnabled: boolean = false;

  onBackgroundMessageHandler:
    | NextFn<MessagePayload>
    | Observer<MessagePayload>
    | null = null;

  onMessageHandler: NextFn<MessagePayload> | Observer<MessagePayload> | null =
    null;

  logEvents: LogEvent[] = [];
  isLogServiceStarted: boolean = false;

  constructor(
    app: FirebaseApp,
    installations: _FirebaseInstallationsInternal,
    analyticsProvider: Provider<FirebaseAnalyticsInternalName>
  ) {
    const appConfig = extractAppConfig(app);

    this.firebaseDependencies = {
      app,
      appConfig,
      installations,
      analyticsProvider
    };
  }

  _delete(): Promise<void> {
    return Promise.resolve();
  }
}
