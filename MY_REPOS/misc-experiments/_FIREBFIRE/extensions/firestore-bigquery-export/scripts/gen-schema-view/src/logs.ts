/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *

export const bigQuerySchemaViewCreating = (
  name: string,
  schema: FirestoreSchema,
  query
) => {
  console.log(
    `BigQuery creating schema view ${name}:\nSchema:\n` +
      `${JSON.stringify(schema)}\nQuery:\n${query}`
  );
};

export const bigQuerySchemaViewCreated = (name: string) => {
  console.log(`BigQuery created schema view ${name}\n`);
};

export const bigQueryViewCreating = (view: string) => {
  console.log(`BigQuery created view ${view}`);
};

export const bigQueryViewCreated = (view: string) => {
  console.log(`BigQuery created view ${view}`);
};
