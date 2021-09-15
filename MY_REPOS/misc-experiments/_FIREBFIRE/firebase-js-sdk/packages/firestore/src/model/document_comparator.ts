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
cument_key';

export type DocumentComparator = (doc1: Document, doc2: Document) => number;

export function compareByKey(doc1: Document, doc2: Document): number {
  return DocumentKey.comparator(doc1.key, doc2.key);
}
