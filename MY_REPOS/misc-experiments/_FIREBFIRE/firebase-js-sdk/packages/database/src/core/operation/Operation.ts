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

/**
 *
 * @enum
 */
export enum OperationType {
  OVERWRITE,
  MERGE,
  ACK_USER_WRITE,
  LISTEN_COMPLETE
}

/**
 * @interface
 */
export interface Operation {
  source: OperationSource;

  type: OperationType;

  path: Path;

  operationForChild(childName: string): Operation | null;
}

export interface OperationSource {
  fromUser: boolean;
  fromServer: boolean;
  queryId: string | null;
  tagged: boolean;
}

export function newOperationSourceUser(): OperationSource {
  return {
    fromUser: true,
    fromServer: false,
    queryId: null,
    tagged: false
  };
}

export function newOperationSourceServer(): OperationSource {
  return {
    fromUser: false,
    fromServer: true,
    queryId: null,
    tagged: false
  };
}

export function newOperationSourceServerTaggedQuery(
  queryId: string
): OperationSource {
  return {
    fromUser: false,
    fromServer: true,
    queryId,
    tagged: true
  };
}
