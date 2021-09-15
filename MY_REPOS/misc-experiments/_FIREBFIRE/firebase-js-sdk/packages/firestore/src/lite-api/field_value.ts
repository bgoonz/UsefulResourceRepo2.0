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
./model/mutation';

/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */
export abstract class FieldValue {
  /**
   * @param _methodName - The public API endpoint that returns this class.
   * @hideconstructor
   */
  constructor(public _methodName: string) {}

  /** Compares `FieldValue`s for equality. */
  abstract isEqual(other: FieldValue): boolean;
  abstract _toFieldTransform(context: ParseContext): FieldTransform | null;
}
