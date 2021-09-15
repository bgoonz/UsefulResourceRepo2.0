const assert = require("assert");
const request = require("supertest");
const sinon = require("sinon");
const axios = require("axios");
const moxios = require("moxios");

const { app, server, getState, setState } = require("../../client");

before(function () {
  moxios.install();
});

it("/callback requests for user info from the protected resource @client-callback-request-user-information", () => {
  setState("mystate");
  let called = false;
  let accessTokenEndpointCalled = false;
  moxios.wait(() => {
    const req = moxios.requests.mostRecent();
    if (!req) {
      return;
    }
    moxios.requests.reset();

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      if (!req || !accessTokenEndpointCalled) {
        return;
      }
      called = true;
      assert.equal(
        req.config.url,
        "http://localhost:9002/user-info",
        "the request to the user-info should be made to the correct URL"
      );

      assert.equal(
        req.config.method,
        "get",
        "the request made to the token endpoint should be a GET request"
      );
      const authHeader =
        req.config.headers.Authorization || req.config.headers.authorization;
      assert.equal(
        authHeader.toLowerCase(),
        "bearer mytoken",
        "the request made to the user-info endpoint should contain the correct auth bearer token"
      );
      req.respondWith({
        status: 200,
        response: {
          access_token: "mytoken",
        },
      });
    });

    accessTokenEndpointCalled = true;
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
      assert.equal(
        called,
        true,
        "/callback did not make an HTTP call to request for user-info"
      );
    });
});

after(() => {
  moxios.uninstall();
  server.close();
});
