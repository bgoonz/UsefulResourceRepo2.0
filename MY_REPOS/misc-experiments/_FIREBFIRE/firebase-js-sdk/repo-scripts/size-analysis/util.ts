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

interface ContentSize {
  size: number;
  gzipSize: number;
}

export function calculateContentSize(content: string): ContentSize {
  const size = Buffer.byteLength(content, 'utf-8');
  const gzipSize = calculateGzipSize.sync(content);
  return {
    size,
    gzipSize
  };
}

export const projectRoot = dirname(resolve(__dirname, '../../package.json'));
