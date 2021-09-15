const assert = require("assert");
const request = require("supertest");

const {
  app,
  requests,
  authorizationCodes,
} = require("../../authorization-server");
const { deleteAllKeys } = require("../../utils");

it("/approve route stores the request in authorizationCodes @authorization-server-approve-store-request", () => {
  deleteAllKeys(requests);
  deleteAllKeys(authorizationCodes);

  const requestId = "asdf4567";
  const state = "yuiop67890";
  const originalClientReq = {
    redirect_uri: "http://www.my-redirect.com/route",
    state,
    response_type: "code",
  };

  requests[requestId] = originalClientReq;
  return request(app)
    .post("/approve")
    .send({
      userName: "john",
      password: "appleseed",
      requestId,
    })
    .then((res) => {
      assert.equal(
        [200, 302, 408].indexOf(res.status) >= 0,
        true,
        "The /approve route should return a 200 status for the correct credentials"
      );

      const keys = Object.keys(authorizationCodes);
      assert.equal(
        keys.length,
        1,
        "Only a single object should be stored in the `authorizationCodes` variable for each request made"
      );

      const { clientReq, userName } = authorizationCodes[keys[0]];
      assert.deepEqual(
        clientReq,
        originalClientReq,
        `"clientReq" key in authorizationCodes object should have the same values as the object stored in requests`
      );
      assert.equal(
        userName,
        "john",
        'the correct userName should be stored as the "userName" key in the authorizationCodes object'
      );
    });
});
