/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { FieldType } from '../models';
import { JSONField, PrimitiveValue } from './types';

export const addToMap = createAction('@document/addToMap')<{
  uuid: number;
  name: string;
  value: PrimitiveValue;
}>();
export const addToArray = createAction('@document/addToArray')<{
  uuid: number;
  value: PrimitiveValue;
}>();
// TODO
export const removeFromMap = createAction('@document/removeFromMap')<{
  uuid: number;
  childId: number;
}>();
// TODO
export const removeFromArray = createAction('@document/removeFromArray')<{
  uuid: number;
  childId: number;
}>();
export const updateName = createAction('@document/updateName')<{
  uuid: number;
  childId: number;
  name: string;
}>();
export const updateType = createAction('@document/updateType')<{
  uuid: number;
  type: FieldType;
}>();
export const updateValue = createAction('@document/updateValue')<{
  uuid: number;
  value: PrimitiveValue | JSONField['value'];
}>();
