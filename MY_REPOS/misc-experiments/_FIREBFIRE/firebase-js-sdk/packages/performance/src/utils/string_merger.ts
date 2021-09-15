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

export function mergeStrings(part1: string, part2: string): string {
  const sizeDiff = part1.length - part2.length;
  if (sizeDiff < 0 || sizeDiff > 1) {
    throw ERROR_FACTORY.create(ErrorCode.INVALID_STRING_MERGER_PARAMETER);
  }

  const resultArray = [];
  for (let i = 0; i < part1.length; i++) {
    resultArray.push(part1.charAt(i));
    if (part2.length > i) {
      resultArray.push(part2.charAt(i));
    }
  }

  return resultArray.join('');
}
