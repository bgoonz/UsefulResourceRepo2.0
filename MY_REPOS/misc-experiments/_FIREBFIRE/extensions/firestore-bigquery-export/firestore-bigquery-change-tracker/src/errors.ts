/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *

  bqMode: string,
  schemaMode: string
) =>
  new Error(
    `Field ${fieldName} has different field mode. BigQuery mode: ${bqMode}; Schema mode: ${schemaMode}`
  );

export const changedFieldType = (
  fieldName: string,
  bqType: string,
  schemaType: string
) =>
  new Error(
    `Field: ${fieldName} has changed field type. BigQuery type: ${bqType}; Schema type: ${schemaType}`
  );
