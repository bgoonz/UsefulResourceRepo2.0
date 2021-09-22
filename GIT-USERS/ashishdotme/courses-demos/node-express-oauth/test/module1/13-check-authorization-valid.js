const assert = require("assert");
const request = require("supertest");

const { app, authorizationCodes } = require("../../authorization-server");

it("/token should return 401 if authorization header doesn't have the correct credentials @authorization-server-check-authorization-valid", () => {
  const code = "randomcode12";
  authorizationCodes[code] = {
    userName: "john",
    clientReq: { scope: "permission:name" },
  };
  return request(app)
    .post("/token")
    .set("authorization", "Basic dGVzdC1jbGllbnQ6VdFNlY3JldA==")
    .send({})
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "The `/token` route should return a 401 if authorization header isn't valid"
      );

      return request(app)
        .post("/token")
        .set("authorization", "Basic dGVzdC1jbGllbnQ6VGVzdFNlY3JldA==")
        .send({ code });
    })
    .then((res) => {
      assert.notEqual(
        res.status,
        401,
        "The /token route should not return a 401 if the authorization header is valid"
      );
    });
});
