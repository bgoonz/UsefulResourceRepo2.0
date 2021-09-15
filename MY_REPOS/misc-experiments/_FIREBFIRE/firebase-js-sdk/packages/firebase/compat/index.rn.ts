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
/package.json';

import './auth';
import './database';
// // TODO(b/158625454): Storage doesn't actually work by default in RN (it uses
// //  `atob`). We should provide a RN build that works out of the box.
// import './storage';
import './firestore';

firebase.registerVersion(name, version, 'compat-rn');

export default firebase;
