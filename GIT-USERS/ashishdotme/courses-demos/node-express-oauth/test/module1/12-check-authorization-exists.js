const assert = require("assert");
const request = require("supertest");

const { app } = require("../../authorization-server");

it("/token should return 401 if authorization header doesn't exist @authorization-server-check-authorization-exists", () => {
  return request(app)
    .post("/token")
    .send({})
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "The `/token` route should return a 401 if authorization header doesn't exist"
      );
    });
});
