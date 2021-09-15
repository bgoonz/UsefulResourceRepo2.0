/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
s f with its arguments asynchronously as a
 * microtask, i.e. as soon as possible after the current script returns back
 * into browser code.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function async(f: Function): Function {
  return (...argsToForward: unknown[]) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.resolve().then(() => f(...argsToForward));
  };
}
