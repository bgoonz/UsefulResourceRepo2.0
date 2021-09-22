const assert = require("assert");
const request = require("supertest");

const { app } = require("../../authorization-server");

it("returns a 200 for a valid client ID @authorization-server-verify-client-id", () => {
  return request(app)
    .get("/authorize?client_id=my-client&scope=permission:name")
    .then((res) => {
      assert.notEqual(res.status, 404, "The `/authorize` route doesn't exist");
      assert.notEqual(
        res.status,
        401,
        "The `/authorize` route should not return a 401 status if the client ID is valid"
      );

      return request(app).get("/authorize?client_id=fake-client");
    })
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "The `/authorize` route should return a 401 status if the client ID is invalid"
      );
    });
});
