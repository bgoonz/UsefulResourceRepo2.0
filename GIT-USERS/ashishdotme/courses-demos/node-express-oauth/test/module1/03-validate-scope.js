const assert = require("assert");
const request = require("supertest");

const { app } = require("../../authorization-server");

it("returns a 200 for a valid scope @authorization-server-validate-scope", () => {
  return request(app)
    .get("/authorize?client_id=my-client&scope=permission:name")
    .then((res) => {
      assert.notEqual(
        res.status,
        401,
        "The `/authorize` route should not return a 401 status if the requested scope is allowed for the given client ID"
      );
      return request(app).get(
        "/authorize?client_id=my-client&scope=permission:password"
      );
    })
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "The `/authorize` route should return a 401 status if the requested scope isn't allowed for the given client ID"
      );
    });
});
