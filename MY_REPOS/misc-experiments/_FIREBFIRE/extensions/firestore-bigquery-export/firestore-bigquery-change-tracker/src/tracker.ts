/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
rom "firebase-functions";

export enum ChangeType {
  CREATE,
  DELETE,
  UPDATE,
  IMPORT,
}

export interface FirestoreDocumentChangeEvent {
  // The timestamp represented in ISO format.
  // Date is not appropriate because it only has millisecond precision.
  // Cloud Firestore timestamps have microsecond precision.
  timestamp: string;
  operation: ChangeType;
  documentName: string;
  eventId: string;
  documentId: string;
  data: Object;
}

export interface FirestoreEventHistoryTracker {
  record(event: FirestoreDocumentChangeEvent[]);
}
