const assert = require("assert");
const request = require("supertest");
const url = require("url");
const querystring = require("querystring");

const { app, server, getState, setState } = require("../../client");

it("redirects user to authorization endpoint @client-redirect-user-to-authorization-endpoint", () => {
  setState("");
  return request(app)
    .get("/authorize")
    .then((res) => {
      assert.equal(
        res.status,
        302,
        "The `/user-info` route should return a redirect status code"
      );
      const redirectUrl = url.parse(res.headers.location);
      const query = querystring.parse(redirectUrl.query);
      assert.equal(
        query.response_type,
        "code",
        'redirect URL response_type should be "code"'
      );
      assert.equal(
        query.client_id,
        "my-client",
        "redirect URL should contain the correct client_id param"
      );
      assert.equal(
        query.redirect_uri,
        "http://localhost:9000/callback",
        "redirect URL should contain the correct redirect_uri param"
      );
      assert.equal(
        query.scope,
        "permission:name permission:date_of_birth",
        "redirect URL should contain the correct scope param"
      );
      assert.equal(
        query.state,
        getState(),
        "redirect URL should contain the correct state param"
      );
    });
});

afterEach(() => {
  server.close();
});
