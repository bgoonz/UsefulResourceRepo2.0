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

import { GrpcConnection } from './grpc_connection';
import { loadProtos } from './load_protos';

/** Loads the GRPC stack */
export function newConnection(databaseInfo: DatabaseInfo): Connection {
  const protos = loadProtos();
  return new GrpcConnection(protos, databaseInfo);
}

/** Return the Platform-specific connectivity monitor. */
export function newConnectivityMonitor(): ConnectivityMonitor {
  return new NoopConnectivityMonitor();
}
