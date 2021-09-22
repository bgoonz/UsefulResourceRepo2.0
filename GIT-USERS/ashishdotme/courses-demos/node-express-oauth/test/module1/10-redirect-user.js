const assert = require("assert");
const request = require("supertest");

const {
  app,
  requests,
  authorizationCodes,
} = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

it("/approve route redirects the user on success @authorization-server-approve-redirect-user", () => {
  deleteAllKeys(requests);
  deleteAllKeys(authorizationCodes);

  const requestId = "asdf4567";
  const state = "yuiop67890";
  const originalClientReq = {
    redirect_uri: "http://www.my-redirect.com/route",
    state,
    response_type: "code",
  };

  requests[requestId] = originalClientReq;
  return request(app)
    .post("/approve")
    .send({
      userName: "john",
      password: "appleseed",
      requestId,
    })
    .then((res) => {
      assert.equal(
        res.status,
        302,
        "The /approve route should return a 302 (redirect) status"
      );

      const code = Object.keys(authorizationCodes)[0];

      const expectedUri =
        "http://www.my-redirect.com/route?code=" +
        encodeURIComponent(code) +
        "&state=" +
        state;
      const actualUri = res.header.location;
      assert.equal(
        actualUri,
        expectedUri,
        "The /approve route should redirect to the correct URI. Got: " +
          actualUri +
          " Wanted: " +
          expectedUri
      );
    });
});
