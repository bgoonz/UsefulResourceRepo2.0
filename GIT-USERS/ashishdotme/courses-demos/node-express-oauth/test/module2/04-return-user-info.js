const assert = require("assert");
const request = require("supertest");

const { app, server } = require("../../protected-resource");

it("/user-info route returns relevant user information @protected-resource-return-user-info", () => {
  return request(app)
    .get("/user-info")
    .set(
      "authorization",
      "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvaG4iLCJzY29wZSI6InBlcm1pc3Npb246bmFtZSBwZXJtaXNzaW9uOmRhdGVfb2ZfYmlydGgiLCJpYXQiOjE1ODk3MzEwODAsImV4cCI6MTk4OTczMTM4MCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDAxIn0.Xt2VFNMCQCdSW2-JLI1bcqVTdxqDPv5czI89FYyTpPHzkvdqfjHGUC3Wb9_qECDFreLkr89YVShBio6EFRCUm3a2cwTAhiPoh9TL4oN6DE4oUwzWczKt3YwOPzvYdCzzfFmpFZwqY8yOIjwCbTjuPGibWsTaGxqIgHQLlrZ5qXK33Gt0KLRUh2LTlZ60fCD0t4qD3Fo8C--lwXZetokwTeJw1e8r-t6SsgSkxZ9478YxJccs_R7skpleDwoYjVMQRBSXsY-y8VGToWiaVg1Dsw8gOvqWDpKtEWysOUrghyvhCMLBMRXibsIFxk7LW-5vYcBpTbbLULKAYq9DawRPOg"
    )
    .then((res) => {
      assert.equal(
        res.status,
        200,
        "/user-info route should return a 200 status for a successful request"
      );
      assert.deepEqual(
        res.body,
        {
          name: "John Appleseed",
          date_of_birth: "12th September 1998",
        },
        "/user-info route should return user information restricted to the requested scope"
      );
    });
});

afterEach(() => {
  server.close();
});
