"use strict";

const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");

const bigquery = new BigQuery();

/**
 * Writes all logs from the Realtime Database into bigquery.
 */
exports.addtobigquery = functions.database
  .ref("/logs/{logid}")
  .onCreate((snapshot) => {
    // TODO: Make sure you set the `bigquery.datasetName` Google Cloud environment variable.
    const dataset = bigquery.dataset(functions.config().bigquery.datasetname);
    // TODO: Make sure you set the `bigquery.tableName` Google Cloud environment variable.
    const table = dataset.table(functions.config().bigquery.tablename);

    return table.insert({
      ID: snapshot.key,
      MESSAGE: snapshot.val().message,
      NUMBER: snapshot.val().number,
    });
  });
