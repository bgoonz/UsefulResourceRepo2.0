const https = require("https");
const fetch = require("isomorphic-fetch");
const Account = require("./models/account");
const authenticated = require("./lib/auth");

exports.handler = authenticated(async (event, context) => {
  const { id: shopId, shopifyToken } = context.account;

  try {
    const resp = await fetch(
      `https://${shopId}/admin/api/2019-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": shopifyToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: event.body,
        agent: new https.Agent({
          ca: require("ssl-root-cas/latest").create(),
        }),
      }
    );

    const text = await resp.text();

    return {
      statusCode: resp.status,
      headers: { "Content-Type": "application/json" },
      body: text,
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Bad request",
        message: e.message,
      }),
    };
  }
});
