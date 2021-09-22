const assert = require("assert");
const request = require("supertest");

const { app } = require("../../authorization-server");

it("serves an empty token route @authorization-server-create-token-route", () => {
  return request(app)
    .post("/token")
    .then((res) => {
      assert.notEqual(res.status, 404, "The `/token` route doesn't exist");
    });
});
