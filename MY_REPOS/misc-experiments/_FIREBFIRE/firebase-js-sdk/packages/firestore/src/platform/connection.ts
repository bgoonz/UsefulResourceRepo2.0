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
om '../remote/connectivity_monitor';

// This file is only used under ts-node.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const platform = require(`./${process.env.TEST_PLATFORM ?? 'node'}/connection`);

export function newConnectivityMonitor(): ConnectivityMonitor {
  return platform.newConnectivityMonitor();
}

export function newConnection(databaseInfo: DatabaseInfo): Connection {
  return platform.newConnection(databaseInfo);
}
