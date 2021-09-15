/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
ase-functions";
import {
  ChangeType,
  FirestoreBigQueryEventHistoryTracker,
  FirestoreEventHistoryTracker,
} from "@firebaseextensions/firestore-bigquery-change-tracker";
import * as logs from "./logs";
import { getChangeType, getDocumentId } from "./util";

const eventTracker: FirestoreEventHistoryTracker = new FirestoreBigQueryEventHistoryTracker(
  {
    tableId: config.tableId,
    datasetId: config.datasetId,
    datasetLocation: config.datasetLocation,
    tablePartitioning: config.tablePartitioning,
  }
);

logs.init();

exports.fsexportbigquery = functions.handler.firestore.document.onWrite(
  async (change, context) => {
    logs.start();
    try {
      const changeType = getChangeType(change);
      const documentId = getDocumentId(change);
      await eventTracker.record([
        {
          timestamp: context.timestamp, // This is a Cloud Firestore commit timestamp with microsecond precision.
          operation: changeType,
          documentName: context.resource.name,
          documentId: documentId,
          eventId: context.eventId,
          data:
            changeType === ChangeType.DELETE ? undefined : change.after.data(),
        },
      ]);
      logs.complete();
    } catch (err) {
      logs.error(err);
    }
  }
);
