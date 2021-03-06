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
rom '../core/query';
import { Document } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import {
  BatchGetDocumentsRequest as ProtoBatchGetDocumentsRequest,
  BatchGetDocumentsResponse as ProtoBatchGetDocumentsResponse,
  RunQueryRequest as ProtoRunQueryRequest,
  RunQueryResponse as ProtoRunQueryResponse
} from '../protos/firestore_proto_api';
import { debugAssert, debugCast, hardAssert } from '../util/assert';
import { AsyncQueue } from '../util/async_queue';
import { Code, FirestoreError } from '../util/error';

import { Connection } from './connection';
import {
  PersistentListenStream,
  PersistentWriteStream,
  WatchStreamListener,
  WriteStreamListener
} from './persistent_stream';
import {
  fromDocument,
  fromBatchGetDocumentsResponse,
  getEncodedDatabaseId,
  JsonProtoSerializer,
  toMutation,
  toName,
  toQueryTarget
} from './serializer';

/**
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */
export abstract class Datastore {
  abstract terminate(): void;
}

/**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */
class DatastoreImpl extends Datastore {
  terminated = false;

  constructor(
    readonly credentials: CredentialsProvider,
    readonly connection: Connection,
    readonly serializer: JsonProtoSerializer
  ) {
    super();
  }

  verifyInitialized(): void {
    debugAssert(!!this.connection, 'Datastore.start() not called');
    if (this.terminated) {
      throw new FirestoreError(
        Code.FAILED_PRECONDITION,
        'The client has already been terminated.'
      );
    }
  }

  /** Gets an auth token and invokes the provided RPC. */
  invokeRPC<Req, Resp>(
    rpcName: string,
    path: string,
    request: Req
  ): Promise<Resp> {
    this.verifyInitialized();
    return this.credentials
      .getToken()
      .then(token => {
        return this.connection.invokeRPC<Req, Resp>(
          rpcName,
          path,
          request,
          token
        );
      })
      .catch((error: FirestoreError) => {
        if (error.name === 'FirebaseError') {
          if (error.code === Code.UNAUTHENTICATED) {
            this.credentials.invalidateToken();
          }
          throw error;
        } else {
          throw new FirestoreError(Code.UNKNOWN, error.toString());
        }
      });
  }

  /** Gets an auth token and invokes the provided RPC with streamed results. */
  invokeStreamingRPC<Req, Resp>(
    rpcName: string,
    path: string,
    request: Req
  ): Promise<Resp[]> {
    this.verifyInitialized();
    return this.credentials
      .getToken()
      .then(token => {
        return this.connection.invokeStreamingRPC<Req, Resp>(
          rpcName,
          path,
          request,
          token
        );
      })
      .catch((error: FirestoreError) => {
        if (error.name === 'FirebaseError') {
          if (error.code === Code.UNAUTHENTICATED) {
            this.credentials.invalidateToken();
          }
          throw error;
        } else {
          throw new FirestoreError(Code.UNKNOWN, error.toString());
        }
      });
  }

  terminate(): void {
    this.terminated = true;
  }
}

// TODO(firestorexp): Make sure there is only one Datastore instance per
// firestore-exp client.
export function newDatastore(
  credentials: CredentialsProvider,
  connection: Connection,
  serializer: JsonProtoSerializer
): Datastore {
  return new DatastoreImpl(credentials, connection, serializer);
}

export async function invokeCommitRpc(
  datastore: Datastore,
  mutations: Mutation[]
): Promise<void> {
  const datastoreImpl = debugCast(datastore, DatastoreImpl);
  const path = getEncodedDatabaseId(datastoreImpl.serializer) + '/documents';
  const request = {
    writes: mutations.map(m => toMutation(datastoreImpl.serializer, m))
  };
  await datastoreImpl.invokeRPC('Commit', path, request);
}

export async function invokeBatchGetDocumentsRpc(
  datastore: Datastore,
  keys: DocumentKey[]
): Promise<Document[]> {
  const datastoreImpl = debugCast(datastore, DatastoreImpl);
  const path = getEncodedDatabaseId(datastoreImpl.serializer) + '/documents';
  const request = {
    documents: keys.map(k => toName(datastoreImpl.serializer, k))
  };
  const response = await datastoreImpl.invokeStreamingRPC<
    ProtoBatchGetDocumentsRequest,
    ProtoBatchGetDocumentsResponse
  >('BatchGetDocuments', path, request);

  const docs = new Map<string, Document>();
  response.forEach(proto => {
    const doc = fromBatchGetDocumentsResponse(datastoreImpl.serializer, proto);
    docs.set(doc.key.toString(), doc);
  });
  const result: Document[] = [];
  keys.forEach(key => {
    const doc = docs.get(key.toString());
    hardAssert(!!doc, 'Missing entity in write response for ' + key);
    result.push(doc);
  });
  return result;
}

export async function invokeRunQueryRpc(
  datastore: Datastore,
  query: Query
): Promise<Document[]> {
  const datastoreImpl = debugCast(datastore, DatastoreImpl);
  const request = toQueryTarget(datastoreImpl.serializer, queryToTarget(query));
  const response = await datastoreImpl.invokeStreamingRPC<
    ProtoRunQueryRequest,
    ProtoRunQueryResponse
  >('RunQuery', request.parent!, { structuredQuery: request.structuredQuery });
  return (
    response
      // Omit RunQueryResponses that only contain readTimes.
      .filter(proto => !!proto.document)
      .map(proto =>
        fromDocument(datastoreImpl.serializer, proto.document!, undefined)
      )
  );
}

export function newPersistentWriteStream(
  datastore: Datastore,
  queue: AsyncQueue,
  listener: WriteStreamListener
): PersistentWriteStream {
  const datastoreImpl = debugCast(datastore, DatastoreImpl);
  datastoreImpl.verifyInitialized();
  return new PersistentWriteStream(
    queue,
    datastoreImpl.connection,
    datastoreImpl.credentials,
    datastoreImpl.serializer,
    listener
  );
}

export function newPersistentWatchStream(
  datastore: Datastore,
  queue: AsyncQueue,
  listener: WatchStreamListener
): PersistentListenStream {
  const datastoreImpl = debugCast(datastore, DatastoreImpl);
  datastoreImpl.verifyInitialized();
  return new PersistentListenStream(
    queue,
    datastoreImpl.connection,
    datastoreImpl.credentials,
    datastoreImpl.serializer,
    listener
  );
}
