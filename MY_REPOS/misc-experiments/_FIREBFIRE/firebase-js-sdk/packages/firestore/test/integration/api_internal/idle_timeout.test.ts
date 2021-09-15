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
til/promise';
import { apiDescribe, withTestDb } from '../util/helpers';
import { asyncQueue } from '../util/internal_helpers';

apiDescribe('Idle Timeout', (persistence: boolean) => {
  it('can write document after idle timeout', () => {
    return withTestDb(persistence, db => {
      const docRef = db.collection('test-collection').doc();
      return docRef
        .set({ foo: 'bar' })
        .then(() => {
          return asyncQueue(db).runAllDelayedOperationsUntil(
            TimerId.WriteStreamIdle
          );
        })
        .then(() => docRef.set({ foo: 'bar' }));
    });
  });

  it('can watch documents after idle timeout', () => {
    return withTestDb(persistence, db => {
      const awaitOnlineSnapshot = (): Promise<void> => {
        const docRef = db.collection('test-collection').doc();
        const deferred = new Deferred<void>();
        const unregister = docRef.onSnapshot(
          { includeMetadataChanges: true },
          snapshot => {
            if (!snapshot.metadata.fromCache) {
              deferred.resolve();
            }
          }
        );
        return deferred.promise.then(unregister);
      };

      return awaitOnlineSnapshot()
        .then(() => {
          return asyncQueue(db).runAllDelayedOperationsUntil(
            TimerId.ListenStreamIdle
          );
        })
        .then(() => awaitOnlineSnapshot());
    });
  });
});
