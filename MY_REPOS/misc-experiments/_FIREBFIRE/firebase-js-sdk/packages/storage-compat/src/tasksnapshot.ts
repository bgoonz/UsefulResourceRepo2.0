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
./reference';
import { UploadTaskCompat } from './task';
import * as types from '@firebase/storage-types';
import { Compat } from '@firebase/util';

export class UploadTaskSnapshotCompat
  implements types.UploadTaskSnapshot, Compat<UploadTaskSnapshot>
{
  constructor(
    readonly _delegate: UploadTaskSnapshot,
    readonly task: UploadTaskCompat,
    readonly ref: ReferenceCompat
  ) {}

  get bytesTransferred(): number {
    return this._delegate.bytesTransferred;
  }
  get metadata(): types.FullMetadata {
    return this._delegate.metadata as types.FullMetadata;
  }
  get state(): string {
    return this._delegate.state;
  }
  get totalBytes(): number {
    return this._delegate.totalBytes;
  }
}
