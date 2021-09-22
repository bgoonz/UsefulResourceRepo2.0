const assert = require("assert");
const request = require("supertest");

const { app } = require("../../authorization-server");

it("serves an empty approve route @authorization-server-create-approve-route", () => {
  return request(app)
    .post("/approve")
    .then((res) => {
      assert.notEqual(res.status, 404, "The `/approve` route doesn't exist");
    });
});
