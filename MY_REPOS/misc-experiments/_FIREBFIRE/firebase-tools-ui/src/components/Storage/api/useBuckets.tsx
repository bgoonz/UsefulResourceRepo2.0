/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { useEmulatorConfig } from '../../common/EmulatorConfigProvider';
import { useBucket } from './useBucket';

export interface Bucket {
  name: string;
}

export function useBuckets() {
  const config = useEmulatorConfig('storage');
  const [bucket] = useBucket();

  const fetcher = async () => {
    const response = await fetch('http://' + config.hostAndPort + '/b');
    const json = await response.json();
    return json.items.map((b: Bucket) => b.name);
  };

  const result = useSWR('storage/buckets/' + bucket, fetcher, {
    suspense: true,
  }).data;

  if (!result.includes(bucket)) {
    return [...result, bucket];
  }

  return result;
}
