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
 from './registerCoreComponents';

const firebase = createFirebaseNamespaceLite();

registerCoreComponents('lite');

// eslint-disable-next-line import/no-default-export
export default firebase;
