/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
lName } from '@firebase/analytics-interop-types';
import { FirebaseApp } from '@firebase/app';
import { Provider } from '@firebase/component';
import { _FirebaseInstallationsInternal } from '@firebase/installations';

export interface FirebaseInternalDependencies {
  app: FirebaseApp;
  appConfig: AppConfig;
  installations: _FirebaseInstallationsInternal;
  analyticsProvider: Provider<FirebaseAnalyticsInternalName>;
}
