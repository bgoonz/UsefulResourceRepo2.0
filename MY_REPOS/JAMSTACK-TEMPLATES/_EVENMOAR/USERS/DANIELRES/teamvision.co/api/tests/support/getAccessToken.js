const util = require("util");
const request = util.promisify(require("request"));

const env = require("../../src/env");

module.exports = () =>
  request({
    method: "POST",
    url: env.AUTH0_ISSUER + "oauth/token",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: env.AUTH0_TEST_CLIENT_ID,
      client_secret: env.AUTH0_TEST_CLIENT_SECRET,
      audience: env.AUTH0_AUDIENCE,
      grant_type: "client_credentials"
    })
  })
    .then(({ body }) => body)
    .then(JSON.parse);
