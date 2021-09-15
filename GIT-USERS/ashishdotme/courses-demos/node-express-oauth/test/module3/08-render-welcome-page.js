const assert = require("assert");
const request = require("supertest");
const sinon = require("sinon");
const axios = require("axios");
const moxios = require("moxios");

const { app, server, getState, setState } = require("../../client");

before(function () {
  moxios.install();
});

it("/callback renders welcome page with user information @client-callback-render-welcome-page", () => {
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
          name: "myname",
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
        res.status,
        200,
        "The `/callback` route should return a 200 status code"
      );
      assert.equal(
        res.text.indexOf(`<title>Welcome`) >= 0,
        true,
        "The returned page doesn't seem to be the welcome page"
      );
      assert.equal(
        res.text.indexOf(`<title>Welcome myname`) >= 0,
        true,
        "The welcome page rendered without the render parameters"
      );
    });
});

after(() => {
  moxios.uninstall();
  server.close();
});
