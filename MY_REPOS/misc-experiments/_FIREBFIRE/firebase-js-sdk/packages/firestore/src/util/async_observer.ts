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

import { FirestoreError } from './error';
import { EventHandler } from './misc';

/*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */
export class AsyncObserver<T> implements Observer<T> {
  /**
   * When set to true, will not raise future events. Necessary to deal with
   * async detachment of listener.
   */
  private muted = false;

  constructor(private observer: Partial<Observer<T>>) {}

  next(value: T): void {
    if (this.observer.next) {
      this.scheduleEvent(this.observer.next, value);
    }
  }

  error(error: FirestoreError): void {
    if (this.observer.error) {
      this.scheduleEvent(this.observer.error, error);
    } else {
      console.error('Uncaught Error in snapshot listener:', error);
    }
  }

  mute(): void {
    this.muted = true;
  }

  private scheduleEvent<E>(eventHandler: EventHandler<E>, event: E): void {
    if (!this.muted) {
      setTimeout(() => {
        if (!this.muted) {
          eventHandler(event);
        }
      }, 0);
    }
  }
}
