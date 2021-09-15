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

import { NamedNode } from './Node';

export function NAME_ONLY_COMPARATOR(left: NamedNode, right: NamedNode) {
  return nameCompare(left.name, right.name);
}

export function NAME_COMPARATOR(left: string, right: string) {
  return nameCompare(left, right);
}
