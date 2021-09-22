const assert = require("assert");
const request = require("supertest");

const { app, server } = require("../../protected-resource");

it("/user-info route gets user info from auth token @protected-resource-auth-token-verification", () => {
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
        "/user-info route should not return an error if the authorization token is valid"
      );

      return request(app)
        .get("/user-info")
        .set(
          "authorization",
          "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvaG4iLCJzY29wZSI6InBlcm1pc3Npb246bmFtZSIsImlhdCI6MTQ4OTczMTA4MCwiZXhwIjoxNDg5NzMxMzgwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDEifQ.XD7CesAUr-_L6KLPFB7kOuu5US2TLZDKUtzaVt2dtBn-UDNi_My4JaTFPieEs_D5_2aYVxGjrmaKQ1pj-lA6MHVybUdnXACzreZ-pME58XAEOIjJrhB77XwQm22R8i2x8HgWt3W33lr6g-xvRZStnGV1BGmzSGMJ2zSGiN88S0CvXTFgYY7-YkG3FKWC1dh449nSul-niQKW0AIazvLdY_KPaLThvFIE3L_HRAsEZ5TUj606Y6K7Pmmn1N98x2v6CkZsqEkAoMzuXRyrGu7sWvo02dATgiHKdxxV_44Q2by-1kETSa-z6XBYvZvWCMZ1HUKKkRY9_169S9s0EcEiwA"
        );
    })
    .then((res) => {
      assert.equal(
        res.status,
        401,
        "/user-info route should return a 401 error if the authorization token is invalid"
      );
    });
});

afterEach(() => {
  server.close();
});
