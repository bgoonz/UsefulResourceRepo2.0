const assert = require("assert");
const request = require("supertest");

const { app, requests } = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

it("renders login page on successful request @authorization-server-render-login", () => {
  deleteAllKeys(requests);
  return request(app)
    .get("/authorize?client_id=my-client&scope=permission:name")
    .then((res) => {
      assert.equal(
        res.header["content-type"],
        "text/html; charset=utf-8",
        "The response doesn't seem to be an HTML page"
      );
      assert.equal(
        res.text.indexOf(`<title>Login Page</title>`) >= 0,
        true,
        "The returned page doesn't seem to be the login page"
      );
      assert.equal(
        res.text.indexOf(
          `Hi! You are logged in. Would you like to approve Sample Client`
        ) >= 0,
        true,
        "Looks like the client parameter wasn't passed as a template variable"
      );
    });
});
