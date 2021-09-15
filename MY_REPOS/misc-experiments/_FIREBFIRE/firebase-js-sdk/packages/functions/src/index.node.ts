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
';

import { name, version } from '../package.json';

export * from './api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
registerFunctions(nodeFetch as any);
registerVersion(name, version, 'node');
