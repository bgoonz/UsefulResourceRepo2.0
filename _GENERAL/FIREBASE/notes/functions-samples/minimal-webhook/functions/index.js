"use strict";

const functions = require("firebase-functions");
const request = require("request-promise");

// This is the URL that we will callback and send the content of the updated data node.
// As an example we're using a Request Bin from http://requestb.in
// TODO: Make sure you create your own Request Bin and change this URL to try this sample.
const WEBHOOK_URL = "http://requestb.in/1mqw97l1";

// Reads the content of the node that triggered the function and sends it to the registered Webhook
// URL.
exports.webhook = functions.database
  .ref("/hooks/{hookId}")
  .onCreate(async (snap) => {
    const response = await request({
      uri: WEBHOOK_URL,
      method: "POST",
      json: true,
      body: snap.val(),
      resolveWithFullResponse: true,
    });
    if (response.statusCode >= 400) {
      throw new Error(`HTTP Error: ${response.statusCode}`);
    }
    functions.logger.log("SUCCESS! Posted", snap.ref);
  });
