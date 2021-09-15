const assert = require("assert");
const request = require("supertest");

const { app, server } = require("../../client");

it("serves an empty callback route @client-create-callback-route", () => {
  return request(app)
    .get("/callback")
    .then((res) => {
      assert.notEqual(res.status, 404, "The `/callback` route doesn't exist");
    });
});

afterEach(() => {
  server.close();
});
