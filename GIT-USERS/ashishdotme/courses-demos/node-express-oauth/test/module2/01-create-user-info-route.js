const assert = require("assert");
const request = require("supertest");

const { app, server } = require("../../protected-resource");

it("serves an empty user-info @protected-resource-create-user-info-route", () => {
  return request(app)
    .get("/user-info")
    .then((res) => {
      assert.notEqual(res.status, 404, "The `/user-info` route doesn't exist");
    });
});

afterEach(() => {
  server.close();
});
