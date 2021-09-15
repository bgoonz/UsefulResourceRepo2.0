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
/core/database_info';
import { JsonProtoSerializer } from '../../remote/serializer';

export function newSerializer(databaseId: DatabaseId): JsonProtoSerializer {
  return new JsonProtoSerializer(databaseId, /* useProto3Json= */ true);
}

/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */
export function newTextEncoder(): TextEncoder {
  return new TextEncoder();
}

/**
 * An instance of the Platform's 'TextDecoder' implementation.
 */
export function newTextDecoder(): TextDecoder {
  return new TextDecoder('utf-8');
}
