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
l } from './platformLoggerService';
import { name, version } from '../package.json';
import { _registerComponent } from './internal';
import { registerVersion } from './api';

export function registerCoreComponents(variant?: string): void {
  _registerComponent(
    new Component(
      'platform-logger',
      container => new PlatformLoggerServiceImpl(container),
      ComponentType.PRIVATE
    )
  );

  // Register `app` package.
  registerVersion(name, version, variant);
  // Register platform SDK identifier (no version).
  registerVersion('fire-js', '');
}
