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

import { StatsCollection } from './StatsCollection';

const collections: { [k: string]: StatsCollection } = {};
const reporters: { [k: string]: unknown } = {};

export function statsManagerGetCollection(repoInfo: RepoInfo): StatsCollection {
  const hashString = repoInfo.toString();

  if (!collections[hashString]) {
    collections[hashString] = new StatsCollection();
  }

  return collections[hashString];
}

export function statsManagerGetOrCreateReporter<T>(
  repoInfo: RepoInfo,
  creatorFunction: () => T
): T {
  const hashString = repoInfo.toString();

  if (!reporters[hashString]) {
    reporters[hashString] = creatorFunction();
  }

  return reporters[hashString] as T;
}
