const assert = require("assert");
const request = require("supertest");

const { app, server } = require("../../authorization-server");

it("serves an empty authorize route @authorization-server-create-authorize-route", () => {
  return request(app)
    .get("/authorize")
    .then((res) => {
      assert.notEqual(res.status, 404, "The `/authorize` route doesn't exist");
    });
});

afterEach(() => {
  server.close();
});
