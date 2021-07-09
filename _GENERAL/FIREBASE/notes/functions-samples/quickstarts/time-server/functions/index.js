"use strict";

// [START functionsimport]
const functions = require("firebase-functions");
// [END functionsimport]
// [START additionalimports]
// Moments library to format dates.
const moment = require("moment");
// CORS Express middleware to enable CORS Requests.
const cors = require("cors")({
  origin: true,
});
// [END additionalimports]

// [START all]
/**
 * Returns the server's date. You must provide a `format` URL query parameter or `format` value in
 * the request body with which we'll try to format the date.
 *
 * Format must follow the Node moment library. See: http://momentjs.com/
 *
 * Example format: "MMMM Do YYYY, h:mm:ss a".
 * Example request using URL query parameters:
 *   https://us-central1-<project-id>.cloudfunctions.net/date?format=MMMM%20Do%20YYYY%2C%20h%3Amm%3Ass%20a
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' /
 *        -d '{"format": "MMMM Do YYYY, h:mm:ss a"}' /
 *        https://us-central1-<project-id>.cloudfunctions.net/date
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.date = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === "PUT") {
    return res.status(403).send("Forbidden!");
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    let format = req.query.format;
    // [END readQueryParam]
    // Reading date format from request body query parameter
    if (!format) {
      // [START readBodyParam]
      format = req.body.format;
      // [END readBodyParam]
    }
    // [START sendResponse]
    const formattedDate = moment().format(`${format}`);
    functions.logger.log("Sending Formatted date:", formattedDate);
    res.status(200).send(formattedDate);
    // [END sendResponse]
  });
});
// [END all]
