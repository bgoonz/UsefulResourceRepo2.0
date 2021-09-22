const assert = require("assert");
const request = require("supertest");

const { app, server } = require("../../protected-resource");

it("verifies existence of authorization token @protected-resource-verify-auth-token-existence", () => {
  return request(app)
    .get("/user-info")
    .set(
      "authorization",
      "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvaG4iLCJzY29wZSI6InBlcm1pc3Npb246bmFtZSIsImlhdCI6MTU4OTczMTA4MCwiZXhwIjoxOTg5NzMxMzgwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDEifQ.TSWuYj9fOT0d753Q6BisA4bYMoJA-_R9oL3OHTy6PjucidfjGuwpXjvD6Bg-kAYIrJf7Z-b7agv65fB0-Xi2sR48HaVYjmva5qI9lbnSyMDyyynaIiUQ2u4mCfZ4NF0Xo06v8QkVzyKZlS4SFOnYZwVAcywSxa4KDI9AkrW-7G8Vo1RNYp8ztsl5bCy8etk8I10S1-ikb0vu4RUSIa3ge2TS5ZsDXzabn3Yb8U5RygE7C_Qxj_xQN-Jff0fKrCl02NNm0v88jTNmQihPiZid7wVi0CTpwlj-CspQPm-flypcWJIHOJOn7yzdScNwAZzqhJtwlZFuDuGvTgg-B5FZbQ"
    )
    .then((res) => {
      assert.equal(
        [200, 408].indexOf(res.status) >= 0,
        true,
        "/user-info route should not return an error if the authorization token exists"
      );

      return request(app).get("/user-info");
    })
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "/user-info route should return a 401 error if the authorization token doens'nt exist"
      );
    });
});

afterEach(() => {
  server.close();
});
