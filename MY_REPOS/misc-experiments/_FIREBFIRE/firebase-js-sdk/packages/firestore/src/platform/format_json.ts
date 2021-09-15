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
const platform = require(`./${
  process.env.TEST_PLATFORM ?? 'node'
}/format_json`);

/** Formats an object as a JSON string, suitable for logging. */
export function formatJSON(value: unknown): string {
  return platform.formatJSON(value);
}
