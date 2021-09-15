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

import { FetchConnection } from './fetch_connection';

export { newConnectivityMonitor } from '../browser/connection';

/** Initializes the HTTP connection for the REST API. */
export function newConnection(databaseInfo: DatabaseInfo): Connection {
  return new FetchConnection(databaseInfo, fetch.bind(null));
}
