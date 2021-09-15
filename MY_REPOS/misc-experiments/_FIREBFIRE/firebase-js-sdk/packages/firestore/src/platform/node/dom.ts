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
ow | null {
  if (process.env.USE_MOCK_PERSISTENCE === 'YES') {
    // eslint-disable-next-line no-restricted-globals
    return window;
  }

  return null;
}

/** The Platform's 'document' implementation or null if not available. */
export function getDocument(): Document | null {
  return null;
}
