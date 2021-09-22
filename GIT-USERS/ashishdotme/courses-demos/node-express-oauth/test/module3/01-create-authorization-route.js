const assert = require("assert");
const request = require("supertest");

const { app, server } = require("../../client");

it("serves an empty authorization route @client-create-authorization-route", () => {
  return request(app)
    .get("/authorize")
    .then((res) => {
      assert.notEqual(res.status, 404, "The `/authorize` route doesn't exist");
    });
});

afterEach(() => {
  server.close();
});
