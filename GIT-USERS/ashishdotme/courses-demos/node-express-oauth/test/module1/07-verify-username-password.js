const assert = require("assert");
const request = require("supertest");

const { app, requests } = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

it("/approve route verifies the userName and password credentials @authorization-server-verify-username-password", () => {
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
        "The /approve route should return a 200 status for the correct username and password"
      );

      return request(app).post("/approve").send({
        userName: "random",
        password: "hacker",
        requestId,
      });
    })
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "The /approve route should return a 401 status if the userName and password are invalid"
      );
    });
});
