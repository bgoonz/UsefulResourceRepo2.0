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
til/assert';
import { FirestoreError } from '../util/error';
import { Deferred } from '../util/promise';

/**
 * Represents the state of bundle loading tasks.
 *
 * Both 'Error' and 'Success' are sinking state: task will abort or complete and there will
 * be no more updates after they are reported.
 */
export type TaskState = 'Error' | 'Running' | 'Success';

/**
 * Represents a progress update or a final state from loading bundles.
 */
export interface LoadBundleTaskProgress {
  /** How many documents have been loaded. */
  documentsLoaded: number;
  /** How many documents are in the bundle being loaded. */
  totalDocuments: number;
  /** How many bytes have been loaded. */
  bytesLoaded: number;
  /** How many bytes are in the bundle being loaded. */
  totalBytes: number;
  /** Current task state. */
  taskState: TaskState;
}

/**
 * Represents the task of loading a Firestore bundle. It provides progress of bundle
 * loading, as well as task completion and error events.
 *
 * The API is compatible with `Promise<LoadBundleTaskProgress>`.
 */
export class LoadBundleTask implements PromiseLike<LoadBundleTaskProgress> {
  private _progressObserver: PartialObserver<LoadBundleTaskProgress> = {};
  private _taskCompletionResolver = new Deferred<LoadBundleTaskProgress>();

  private _lastProgress: LoadBundleTaskProgress = {
    taskState: 'Running',
    totalBytes: 0,
    totalDocuments: 0,
    bytesLoaded: 0,
    documentsLoaded: 0
  };

  /**
   * Registers functions to listen to bundle loading progress events.
   * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
   *   each time a Firestore document is loaded from the bundle.
   * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
   *   error, and there should be no more updates after this.
   * @param complete - Called when the loading task is complete.
   */
  onProgress(
    next?: (progress: LoadBundleTaskProgress) => unknown,
    error?: (err: Error) => unknown,
    complete?: () => void
  ): void {
    this._progressObserver = {
      next,
      error,
      complete
    };
  }

  /**
   * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
   *
   * @param onRejected - Called when an error occurs during bundle loading.
   */
  catch<R>(
    onRejected: (a: Error) => R | PromiseLike<R>
  ): Promise<R | LoadBundleTaskProgress> {
    return this._taskCompletionResolver.promise.catch(onRejected);
  }

  /**
   * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
   *
   * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
   *   The update will always have its `taskState` set to `"Success"`.
   * @param onRejected - Called when an error occurs during bundle loading.
   */
  then<T, R>(
    onFulfilled?: (a: LoadBundleTaskProgress) => T | PromiseLike<T>,
    onRejected?: (a: Error) => R | PromiseLike<R>
  ): Promise<T | R> {
    return this._taskCompletionResolver.promise.then(onFulfilled, onRejected);
  }

  /**
   * Notifies all observers that bundle loading has completed, with a provided
   * `LoadBundleTaskProgress` object.
   *
   * @private
   */
  _completeWith(progress: LoadBundleTaskProgress): void {
    debugAssert(
      progress.taskState === 'Success',
      'Task is not completed with Success.'
    );
    this._updateProgress(progress);
    if (this._progressObserver.complete) {
      this._progressObserver.complete();
    }

    this._taskCompletionResolver.resolve(progress);
  }

  /**
   * Notifies all observers that bundle loading has failed, with a provided
   * `Error` as the reason.
   *
   * @private
   */
  _failWith(error: FirestoreError): void {
    this._lastProgress.taskState = 'Error';

    if (this._progressObserver.next) {
      this._progressObserver.next(this._lastProgress);
    }

    if (this._progressObserver.error) {
      this._progressObserver.error(error);
    }

    this._taskCompletionResolver.reject(error);
  }

  /**
   * Notifies a progress update of loading a bundle.
   * @param progress - The new progress.
   *
   * @private
   */
  _updateProgress(progress: LoadBundleTaskProgress): void {
    debugAssert(
      this._lastProgress.taskState === 'Running',
      'Cannot update progress on a completed or failed task'
    );

    this._lastProgress = progress;
    if (this._progressObserver.next) {
      this._progressObserver.next(progress);
    }
  }
}
