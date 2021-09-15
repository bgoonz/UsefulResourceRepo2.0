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
/remote/connection';
import { ConnectivityMonitor } from '../../remote/connectivity_monitor';
import { NoopConnectivityMonitor } from '../../remote/connectivity_monitor_noop';

import { BrowserConnectivityMonitor } from './connectivity_monitor';
import { WebChannelConnection } from './webchannel_connection';

/** Initializes the WebChannelConnection for the browser. */
export function newConnection(databaseInfo: DatabaseInfo): Connection {
  return new WebChannelConnection(databaseInfo);
}

/** Return the Platform-specific connectivity monitor. */
export function newConnectivityMonitor(): ConnectivityMonitor {
  if (BrowserConnectivityMonitor.isAvailable()) {
    return new BrowserConnectivityMonitor();
  } else {
    return new NoopConnectivityMonitor();
  }
}
