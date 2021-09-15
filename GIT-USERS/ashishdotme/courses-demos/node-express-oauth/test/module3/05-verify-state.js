const assert = require("assert");
const request = require("supertest");
const sinon = require("sinon");
const axios = require("axios");
const moxios = require("moxios");

const { app, server, getState, setState } = require("../../client");

before(function () {
  moxios.install();
});

it("verifies state with current stored state @client-callback-verify-state", () => {
  setState("mystate");

  moxios.wait(() => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      if (!req) {
        return;
      }
      req.respondWith({
        status: 200,
        response: {
          access_token: "mytoken",
        },
      });
    });

    const req = moxios.requests.mostRecent();
    if (!req) {
      return;
    }
    req.respondWith({
      status: 200,
      response: {
        access_token: "mytoken",
      },
    });
  });

  return request(app)
    .get("/callback?code=mycode&state=mystate")
    .then((res) => {
      assert.equal(
        [408, 200].indexOf(res.status) >= 0,
        true,
        "The `/callback` route should not return an error status code"
      );

      return request(app).get("/callback?code=mycode&state=fakestate");
    })
    .then((res) => {
      assert.equal(
        res.status,
        403,
        "/callback should return a 403 status if the states don't match"
      );
    });
});

after(() => {
  moxios.uninstall();
  server.close();
});
