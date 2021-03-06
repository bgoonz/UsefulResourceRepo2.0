"use strict";

const functions = require("firebase-functions");
const rp = require("request-promise");
const crypto = require("crypto");
const secureCompare = require("secure-compare");

/**
 * Webhook that will be called each time there is a new GitHub commit and will post a message to
 * Slack.
 */
exports.githubWebhook = functions.https.onRequest(async (req, res) => {
  const cipher = "sha1";
  const signature = req.headers["x-hub-signature"];

  // TODO: Configure the `github.secret` Google Cloud environment variables.
  const hmac = crypto
    .createHmac(cipher, functions.config().github.secret)
    .update(req.rawBody)
    .digest("hex");
  const expectedSignature = `${cipher}=${hmac}`;

  // Check that the body of the request has been signed with the GitHub Secret.
  if (!secureCompare(signature, expectedSignature)) {
    functions.logger.error(
      "x-hub-signature",
      signature,
      "did not match",
      expectedSignature
    );
    res.status(403).send("Your x-hub-signature's bad and you should feel bad!");
    return;
  }

  try {
    await postToSlack(
      req.body.compare,
      req.body.commits.length,
      req.body.repository
    );
    res.end();
  } catch (error) {
    functions.logger.error(error);
    res
      .status(500)
      .send("Something went wrong while posting the message to Slack.");
  }
});

/**
 * Post a message to Slack about the new GitHub commit.
 */
function postToSlack(url, commits, repo) {
  return rp({
    method: "POST",
    // TODO: Configure the `slack.webhook_url` Google Cloud environment variables.
    uri: functions.config().slack.webhook_url,
    body: {
      text: `<${url}|${commits} new commit${
        commits > 1 ? "s" : ""
      }> pushed to <${repo.url}|${repo.full_name}>.`,
    },
    json: true,
  });
}
