/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

/**
 * Result returned by `list()`.
 * @public
 */
export interface ListResult {
  /**
   * References to prefixes (sub-folders). You can call list() on them to
   * get its contents.
   *
   * Folders are implicit based on '/' in the object paths.
   * For example, if a bucket has two objects '/a/b/1' and '/a/b/2', list('/a')
   * will return '/a/b' as a prefix.
   */
  prefixes: Reference[];
  /**
   * Objects in this directory.
   * You can call getMetadata() and getDownloadUrl() on them.
   */
  items: Reference[];
  /**
   * If set, there might be more results for this list. Use this token to resume the list.
   */
  nextPageToken?: string;
}
