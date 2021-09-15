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
s after a number
 */
export function ordinal(i: number): string {
  if (!Number.isFinite(i)) {
    return `${i}`;
  }
  return i + indicator(i);
}

function indicator(i: number): string {
  i = Math.abs(i);
  const cent = i % 100;
  if (cent >= 10 && cent <= 20) {
    return 'th';
  }
  const dec = i % 10;
  if (dec === 1) {
    return 'st';
  }
  if (dec === 2) {
    return 'nd';
  }
  if (dec === 3) {
    return 'rd';
  }
  return 'th';
}
