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

  NamedQuery as ProtoNamedQuery,
  BundleMetadata as ProtoBundleMetadata
} from '../protos/firestore_bundle_proto';

import { BundleCache } from './bundle_cache';
import {
  fromBundleMetadata,
  fromProtoNamedQuery,
  LocalSerializer
} from './local_serializer';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';

export class MemoryBundleCache implements BundleCache {
  private bundles = new Map<string, BundleMetadata>();
  private namedQueries = new Map<string, NamedQuery>();

  constructor(private serializer: LocalSerializer) {}

  getBundleMetadata(
    transaction: PersistenceTransaction,
    bundleId: string
  ): PersistencePromise<BundleMetadata | undefined> {
    return PersistencePromise.resolve(this.bundles.get(bundleId));
  }

  saveBundleMetadata(
    transaction: PersistenceTransaction,
    bundleMetadata: ProtoBundleMetadata
  ): PersistencePromise<void> {
    this.bundles.set(bundleMetadata.id!, fromBundleMetadata(bundleMetadata));
    return PersistencePromise.resolve();
  }

  getNamedQuery(
    transaction: PersistenceTransaction,
    queryName: string
  ): PersistencePromise<NamedQuery | undefined> {
    return PersistencePromise.resolve(this.namedQueries.get(queryName));
  }

  saveNamedQuery(
    transaction: PersistenceTransaction,
    query: ProtoNamedQuery
  ): PersistencePromise<void> {
    this.namedQueries.set(query.name!, fromProtoNamedQuery(query));
    return PersistencePromise.resolve();
  }
}
