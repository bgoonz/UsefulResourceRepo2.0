/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { storagePath } from '../common/constants';
import { StorageRouterParams } from '../types';

export type UseBucketResult = [string, (bucket: string) => void];

export function useBucket(): UseBucketResult {
  const history = useHistory();
  const bucket = useParams<StorageRouterParams>().bucket;

  function setBucket(bucket: string) {
    history.push(storagePath + bucket);
  }

  return [bucket, setBucket];
}
