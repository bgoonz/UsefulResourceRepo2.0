const assert = require("assert");
const request = require("supertest");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const { app, authorizationCodes } = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

const publicKey = fs.readFileSync("assets/public_key.pem");

it("/token should return the appropriate JWT if authorization succeeds @authorization-server-verify-jwt-response", () => {
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
        res.status,
        200,
        "/token should return a 200 status if authorization succeeds"
      );
      const { access_token, token_type } = res.body;
      assert.equal(
        token_type.toLowerCase(),
        "bearer",
        'The value of the "access_token" key should be "Bearer"'
      );
      try {
        const userInfo = jwt.verify(access_token, publicKey, {
          algorithms: ["RS256"],
        });
        assert.equal(
          userInfo.userName,
          "john",
          "The issued JWT should contain the correct userName parameter"
        );
        assert.equal(
          userInfo.scope,
          "permission:name",
          "The issued JWT should contain the correct scope parameter"
        );
      } catch (err) {
        assert.fail("The issued JWT should be valid: " + err);
      }
    });
});
