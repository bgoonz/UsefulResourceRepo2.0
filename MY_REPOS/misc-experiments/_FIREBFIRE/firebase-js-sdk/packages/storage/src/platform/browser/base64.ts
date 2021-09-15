/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
ded: string): string {
  return atob(encoded);
}

export function decodeUint8Array(data: Uint8Array): string {
  return new TextDecoder().decode(data);
}
