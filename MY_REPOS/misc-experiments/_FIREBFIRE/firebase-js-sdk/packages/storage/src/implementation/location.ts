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
lated to the parsing/composition of bucket/
 * object location.
 */

import { invalidDefaultBucket, invalidUrl } from './error';
import { DEFAULT_HOST } from './constants';

/**
 * Firebase Storage location data.
 *
 * @internal
 */
export class Location {
  private path_: string;

  constructor(public readonly bucket: string, path: string) {
    this.path_ = path;
  }

  get path(): string {
    return this.path_;
  }

  get isRoot(): boolean {
    return this.path.length === 0;
  }

  fullServerUrl(): string {
    const encode = encodeURIComponent;
    return '/b/' + encode(this.bucket) + '/o/' + encode(this.path);
  }

  bucketOnlyServerUrl(): string {
    const encode = encodeURIComponent;
    return '/b/' + encode(this.bucket) + '/o';
  }

  static makeFromBucketSpec(bucketString: string, host: string): Location {
    let bucketLocation;
    try {
      bucketLocation = Location.makeFromUrl(bucketString, host);
    } catch (e) {
      // Not valid URL, use as-is. This lets you put bare bucket names in
      // config.
      return new Location(bucketString, '');
    }
    if (bucketLocation.path === '') {
      return bucketLocation;
    } else {
      throw invalidDefaultBucket(bucketString);
    }
  }

  static makeFromUrl(url: string, host: string): Location {
    let location: Location | null = null;
    const bucketDomain = '([A-Za-z0-9.\\-_]+)';

    function gsModify(loc: Location): void {
      if (loc.path.charAt(loc.path.length - 1) === '/') {
        loc.path_ = loc.path_.slice(0, -1);
      }
    }
    const gsPath = '(/(.*))?$';
    const gsRegex = new RegExp('^gs://' + bucketDomain + gsPath, 'i');
    const gsIndices = { bucket: 1, path: 3 };

    function httpModify(loc: Location): void {
      loc.path_ = decodeURIComponent(loc.path);
    }
    const version = 'v[A-Za-z0-9_]+';
    const firebaseStorageHost = host.replace(/[.]/g, '\\.');
    const firebaseStoragePath = '(/([^?#]*).*)?$';
    const firebaseStorageRegExp = new RegExp(
      `^https?://${firebaseStorageHost}/${version}/b/${bucketDomain}/o${firebaseStoragePath}`,
      'i'
    );
    const firebaseStorageIndices = { bucket: 1, path: 3 };

    const cloudStorageHost =
      host === DEFAULT_HOST
        ? '(?:storage.googleapis.com|storage.cloud.google.com)'
        : host;
    const cloudStoragePath = '([^?#]*)';
    const cloudStorageRegExp = new RegExp(
      `^https?://${cloudStorageHost}/${bucketDomain}/${cloudStoragePath}`,
      'i'
    );
    const cloudStorageIndices = { bucket: 1, path: 2 };

    const groups = [
      { regex: gsRegex, indices: gsIndices, postModify: gsModify },
      {
        regex: firebaseStorageRegExp,
        indices: firebaseStorageIndices,
        postModify: httpModify
      },
      {
        regex: cloudStorageRegExp,
        indices: cloudStorageIndices,
        postModify: httpModify
      }
    ];
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const captures = group.regex.exec(url);
      if (captures) {
        const bucketValue = captures[group.indices.bucket];
        let pathValue = captures[group.indices.path];
        if (!pathValue) {
          pathValue = '';
        }
        location = new Location(bucketValue, pathValue);
        group.postModify(location);
        break;
      }
    }
    if (location == null) {
      throw invalidUrl(url);
    }
    return location;
  }
}
