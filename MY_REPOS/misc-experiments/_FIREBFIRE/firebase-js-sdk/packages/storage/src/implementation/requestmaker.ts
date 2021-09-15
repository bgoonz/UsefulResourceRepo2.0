/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
/connectionPool';

type requestMaker = <T>(
  requestInfo: RequestInfo<T>,
  appId: string | null,
  authToken: string | null,
  pool: ConnectionPool
) => Request<T>;

export { requestMaker };
