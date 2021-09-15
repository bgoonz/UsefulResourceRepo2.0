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

import {
  loadRawProtos,
  protoLoaderOptions
} from '../../../src/platform/node/load_protos';
import * as api from '../../../src/protos/firestore_proto_api';

import { serializerTest } from './serializer.helper';

const protos = loadRawProtos();

// tslint:disable-next-line:variable-name
const ValueMessage = protos.lookupType('google.firestore.v1.Value');

/**
 * Verifies full round-trip of JSON protos through ProtobufJs.
 */
export function verifyProtobufJsRoundTrip(jsonValue: api.Value): void {
  const protobufJsEncodedProto = ValueMessage.fromObject(jsonValue);
  const protobufJsDecodedProto = ValueMessage.toObject(
    protobufJsEncodedProto,
    protoLoaderOptions
  );
  expect(protobufJsDecodedProto).to.deep.equal(jsonValue);
}

serializerTest(verifyProtobufJsRoundTrip);
