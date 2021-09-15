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

import { utcTimestampToDateString } from '../util/time';

export class UserMetadata implements UserMetadataType {
  creationTime?: string;
  lastSignInTime?: string;

  constructor(
    private createdAt?: string | number,
    private lastLoginAt?: string | number
  ) {
    this._initializeTime();
  }

  private _initializeTime(): void {
    this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
    this.creationTime = utcTimestampToDateString(this.createdAt);
  }

  _copy(metadata: UserMetadata): void {
    this.createdAt = metadata.createdAt;
    this.lastLoginAt = metadata.lastLoginAt;
    this._initializeTime();
  }

  toJSON(): object {
    return {
      createdAt: this.createdAt,
      lastLoginAt: this.lastLoginAt
    };
  }
}
