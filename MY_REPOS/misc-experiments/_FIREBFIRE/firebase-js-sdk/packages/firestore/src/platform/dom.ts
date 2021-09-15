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
script-eslint/no-require-imports
const platform = require(`./${process.env.TEST_PLATFORM ?? 'node'}/dom`);

/** The Platform's 'window' implementation or null if not available. */
export function getWindow(): Window | null {
  return platform.getWindow();
}

/** The Platform's 'document' implementation or null if not available. */
export function getDocument(): Document | null {
  return platform.getDocument();
}
