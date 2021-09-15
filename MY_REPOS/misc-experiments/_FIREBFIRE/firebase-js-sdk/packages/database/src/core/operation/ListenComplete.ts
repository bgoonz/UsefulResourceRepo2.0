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

import { Operation, OperationSource, OperationType } from './Operation';

export class ListenComplete implements Operation {
  /** @inheritDoc */
  type = OperationType.LISTEN_COMPLETE;

  constructor(public source: OperationSource, public path: Path) {}

  operationForChild(childName: string): ListenComplete {
    if (pathIsEmpty(this.path)) {
      return new ListenComplete(this.source, newEmptyPath());
    } else {
      return new ListenComplete(this.source, pathPopFront(this.path));
    }
  }
}
