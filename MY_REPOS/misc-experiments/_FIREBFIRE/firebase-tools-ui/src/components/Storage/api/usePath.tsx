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
import { useBucket } from './useBucket';

export function usePath(): [string, (bucket: string) => void] {
  const { path } = useParams<StorageRouterParams>();
  const [bucket] = useBucket();
  const history = useHistory();

  function setPath(path: string) {
    path = path.replace(/\/+/g, '/');

    history.push(
      storagePath + bucket + (path.startsWith('/') ? '' : '/') + path
    );
  }

  return [path || '', setPath];
}
