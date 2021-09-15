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
import { StorageServiceCompat } from './service';
import { Compat } from '@firebase/util';

export class ListResultCompat implements types.ListResult, Compat<ListResult> {
  constructor(
    readonly _delegate: ListResult,
    private readonly _service: StorageServiceCompat
  ) {}

  get prefixes(): ReferenceCompat[] {
    return this._delegate.prefixes.map(
      ref => new ReferenceCompat(ref, this._service)
    );
  }
  get items(): ReferenceCompat[] {
    return this._delegate.items.map(
      ref => new ReferenceCompat(ref, this._service)
    );
  }
  get nextPageToken(): string | null {
    return this._delegate.nextPageToken || null;
  }
}
