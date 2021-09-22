const assert = require("assert");
const request = require("supertest");
const sinon = require("sinon");
const axios = require("axios");
const moxios = require("moxios");

const { app, server, getState, setState } = require("../../client");

before(function () {
  moxios.install();
});

it("/callback requests access token from the token endpoint @client-callback-request-access-token", () => {
  setState("mystate");
  let called = false;
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
    called = true;
    assert.equal(
      req.config.url,
      "http://localhost:9001/token",
      "the request to the token endpoint should be made to the correct URL"
    );
    assert.equal(
      req.config.data,
      '{"code":"mycode"}',
      "the request made to the token endpoint should contain the correct authorization code in the request body"
    );
    assert.equal(
      req.config.method,
      "post",
      "the request made to the token endpoint should be a POST request"
    );
    assert.equal(
      req.config.headers.Authorization,
      "Basic bXktY2xpZW50OnpFVHFIZ2wwZDdUaHlzVXFQbmFGdUxPbUcxRT0=",
      "the request made to the token endpoint should contain the correct auth credentials"
    );
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
        "/callback needs to make an HTTP call to request for the access token"
      );
    });
});

after(() => {
  moxios.uninstall();
  server.close();
});
