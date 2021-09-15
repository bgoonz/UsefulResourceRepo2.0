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
-chai';

import { dbDelete } from '../internals/idb-manager';
import { deleteDb } from 'idb';
import { restore } from 'sinon';
import { use } from 'chai';

use(chaiAsPromised);
use(sinonChai);

afterEach(async () => {
  restore();
  await dbDelete();
  await deleteDb('fcm_token_details_db');
});
