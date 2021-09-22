const assert = require("assert");
const request = require("supertest");

const { app, authorizationCodes } = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

it("/token should return 401 if code object doesn't exist in authorizationCodes @authorization-server-verify-authorization-code", () => {
  deleteAllKeys(authorizationCodes);
  const code = "somerandomcode";
  authorizationCodes[code] = {
    userName: "john",
    clientReq: { scope: "permission:name" },
  };
  return request(app)
    .post("/token")
    .set("authorization", "Basic dGVzdC1jbGllbnQ6VGVzdFNlY3JldA==")
    .send({ code })
    .then((res) => {
      assert.equal(
        Object.keys(authorizationCodes).length,
        0,
        "If the key exists in `authorizationCodes`, it should be deleted from the `authorizationCodes` object"
      );
      return request(app)
        .post("/token")
        .set("authorization", "Basic dGVzdC1jbGllbnQ6VGVzdFNlY3JldA==")
        .send({ code: "someotherrandomcode" });
    })
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "/token should return a 401 error if the code doesn't exist in the `authorizationCodes` object"
      );
    });
});
