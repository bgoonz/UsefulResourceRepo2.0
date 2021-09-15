/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { CollectionFilter } from './models';

export const addCollectionFilter = createAction(
  '@firestore/addCollectionFilter'
)<
  {
    path: string;
  } & CollectionFilter
>();
export const removeCollectionFilter = createAction(
  '@firestore/removeCollectionFilter'
)<{
  path: string;
}>();
