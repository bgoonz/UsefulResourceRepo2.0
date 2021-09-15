/**
 * Firebase Remote Config
 *
 * @packageDocumentation
 */

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

// Facilitates debugging by enabling settings changes without rebuilding asset.
// Note these debug options are not part of a documented, supported API and can change at any time.
// Consolidates debug options for easier discovery.
// Uses transient variables on window to avoid lingering state causing panic.
declare global {
  interface Window {
    FIREBASE_REMOTE_CONFIG_URL_BASE: string;
  }
}

export * from './api';
export * from './api2';
export * from './public_types';

/** register component and version */
registerRemoteConfig();
