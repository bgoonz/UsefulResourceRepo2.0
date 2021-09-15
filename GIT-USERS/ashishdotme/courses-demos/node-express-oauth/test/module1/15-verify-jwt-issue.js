const assert = require("assert");
const sinon = require("sinon");
const request = require("supertest");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const { app, authorizationCodes } = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

const publicKey = fs.readFileSync("assets/public_key.pem");

after(() => {
  sinon.restore();
});

it("/token should issue the appropriate JWT if authorization succeeds @authorization-server-verify-jwt-issue", () => {
  deleteAllKeys(authorizationCodes);
  sinon.replace(
    jwt,
    "sign",
    sinon.fake.returns(
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvaG4iLCJzY29wZSI6InBlcm1pc3Npb246bmFtZSIsImlhdCI6MTU4OTczMTA4MCwiZXhwIjoxOTg5NzMxMzgwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDEifQ.TSWuYj9fOT0d753Q6BisA4bYMoJA-_R9oL3OHTy6PjucidfjGuwpXjvD6Bg-kAYIrJf7Z-b7agv65fB0-Xi2sR48HaVYjmva5qI9lbnSyMDyyynaIiUQ2u4mCfZ4NF0Xo06v8QkVzyKZlS4SFOnYZwVAcywSxa4KDI9AkrW-7G8Vo1RNYp8ztsl5bCy8etk8I10S1-ikb0vu4RUSIa3ge2TS5ZsDXzabn3Yb8U5RygE7C_Qxj_xQN-Jff0fKrCl02NNm0v88jTNmQihPiZid7wVi0CTpwlj-CspQPm-flypcWJIHOJOn7yzdScNwAZzqhJtwlZFuDuGvTgg-B5FZbQ"
    )
  );
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
        jwt.sign.callCount,
        1,
        "/token should call the `jwt.sign` method to issue the JWT"
      );
      const { args } = jwt.sign.getCall(0);
      const payload = args[0];
      const jwtConfig = args[2];
      assert.equal(
        payload !== null && typeof payload === "object",
        true,
        "JWT payload should be an object"
      );
      assert.equal(
        payload.userName,
        "john",
        "/token should set the correct userName on the JWT payload"
      );
      assert.equal(
        payload.scope,
        "permission:name",
        "/token should se the correct scope on the JWT payload"
      );
      assert.equal(
        jwtConfig !== null && typeof jwtConfig === "object",
        true,
        "JWT config should be an object"
      );
      assert.equal(
        jwtConfig.algorithm,
        "RS256",
        'JWT algorithm should be set to "RS256"'
      );
    });
});
