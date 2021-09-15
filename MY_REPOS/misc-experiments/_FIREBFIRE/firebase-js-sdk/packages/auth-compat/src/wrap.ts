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

  unwrap(): T;
}

/** Reverse direction wrapper from Exp --wrapped--> Compat */
export interface ReverseWrapper<T> {
  wrapped(): T;
}

export function unwrap<T>(object: unknown): T {
  return (object as Wrapper<T>).unwrap();
}

export function wrapped<T>(object: unknown): T {
  return (object as ReverseWrapper<T>).wrapped();
}
