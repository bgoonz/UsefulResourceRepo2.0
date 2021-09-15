/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *

    type === "HOUR" ||
    type === "DAY" ||
    type === "MONTH" ||
    type === "YEAR"
  ) {
    return type;
  }

  return null;
}

export default {
  collectionPath: process.env.COLLECTION_PATH,
  datasetId: process.env.DATASET_ID,
  tableId: process.env.TABLE_ID,
  location: process.env.LOCATION,
  initialized: false,
  datasetLocation: process.env.DATASET_LOCATION,
  tablePartitioning: tablePartitioning(process.env.TABLE_PARTITIONING),
};
