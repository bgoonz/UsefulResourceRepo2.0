const assert = require("assert");
const request = require("supertest");

const { app, server, getState, setState } = require("../../client");

it("assigns a random value to the state @client-declare-state", () => {
  setState("");
  return request(app)
    .get("/authorize")
    .then((res) => {
      assert.equal(
        [408, 302].indexOf(res.status) >= 0,
        true,
        "The `/user-info` route should not return an error status code"
      );
      const state = getState();
      assert.strictEqual(
        typeof state,
        "string",
        "/authorize should assign a random string to state"
      );
      assert.strictEqual(
        state.length > 0,
        true,
        "/authorize should assign a non-empty string to state"
      );
    });
});

afterEach(() => {
  server.close();
});
