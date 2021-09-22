const assert = require("assert");
const request = require("supertest");

const { app, requests } = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

it("stores the request in local memory @authorization-server-store-request", () => {
  deleteAllKeys(requests);
  return request(app)
    .get("/authorize?client_id=my-client&scope=permission:name")
    .then((res) => {
      const keys = Object.keys(requests);
      assert.equal(
        keys.length,
        1,
        "Only a single request object should be stored in the `requests` variable for each request made"
      );
      const storedRequest = requests[keys[0]];
      assert.equal(
        storedRequest.client_id,
        "my-client",
        "the stored request object should contain the client ID"
      );
      assert.equal(
        storedRequest.scope,
        "permission:name",
        "the stored request object should contain the client scope"
      );
    });
});
