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
RROR_MSG =
  'The current tab is not in the required state to perform this operation. ' +
  'It might be necessary to refresh the browser tab.';

/** The different modes supported by `Persistence.runTransaction()`. */
export type PersistenceTransactionMode =
  | 'readonly'
  | 'readwrite'
  | 'readwrite-primary';

/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */
export abstract class PersistenceTransaction {
  private readonly onCommittedListeners: Array<() => void> = [];

  abstract readonly currentSequenceNumber: ListenSequenceNumber;

  addOnCommittedListener(listener: () => void): void {
    this.onCommittedListeners.push(listener);
  }

  raiseOnCommittedEvent(): void {
    this.onCommittedListeners.forEach(listener => listener());
  }
}
