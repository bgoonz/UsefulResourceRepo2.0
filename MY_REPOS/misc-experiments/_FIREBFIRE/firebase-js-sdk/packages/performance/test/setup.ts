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

import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';

use(chaiAsPromised);
use(sinonChai);
afterEach(() => {
  restore();
});
