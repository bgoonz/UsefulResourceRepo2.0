const assert = require("assert");
const request = require("supertest");

const { app, requests } = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

it("/approve route verifies the existence of a valid request @authorization-server-verify-request-existence", () => {
  deleteAllKeys(requests);
  const requestId = "asdf4567";
  const state = "yuiop67890";
  requests[requestId] = {
    redirect_uri: "http://www.my-redirect.com/route",
    state,
    response_type: "code",
  };
  return request(app)
    .post("/approve")
    .send({
      userName: "john",
      password: "appleseed",
      requestId,
    })
    .then((res) => {
      assert.equal(
        [200, 302, 408].indexOf(res.status) >= 0,
        true,
        "The /approve route should return a 200 status for the correct credentials"
      );

      assert.equal(
        requests[requestId],
        null,
        "The request with the given requestId should be deleted from the requests object after verifying existence"
      );

      return request(app).post("/approve").send({
        userName: "john",
        password: "appleseed",
        requestId,
      });
    })
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "The /approve route should return a 401 status for an invalid requestId"
      );
    });
});
