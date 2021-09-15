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
'@firebase/app';
import { Installations } from '../interfaces/public-types';

export interface FirebaseInstallationsImpl
  extends Installations,
    _FirebaseService {
  readonly appConfig: AppConfig;
  readonly platformLoggerProvider: Provider<'platform-logger'>;
}

export interface AppConfig {
  readonly appName: string;
  readonly projectId: string;
  readonly apiKey: string;
  readonly appId: string;
}
