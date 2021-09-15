const nock = require("nock");
const myProbotApp = require("..");
const { Probot } = require("probot");
const commitsPayload = require("./fixtures/commits.json");
const pullRequestOpenedPayload = require("./fixtures/pull_request.opened.json");
const configContentPayload = require("./fixtures/config-content.js");
const fs = require("fs");
const path = require("path");

describe("Auto Label", () => {
  let probot;
  let mockCert;

  beforeAll(done => {
    fs.readFile(path.join(__dirname, "fixtures/mock-cert.pem"), (err, cert) => {
      if (err) return done(err);
      mockCert = cert;
      done();
    });
  });

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({ id: 123, cert: mockCert });
    // Load our app into probot
    probot.load(myProbotApp);
  });

  afterEach(() => {
    // console.log(nock.pendingMocks());
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it("reads commits when a pull request is opened", async () => {
    nock("https://api.github.com")
      .get("/repos/myorg/myrepo/contents/.github/auto-label.yml")
      .reply(200, configContentPayload);
    // Test that we correctly return a test token
    nock("https://api.github.com")
      .post("/app/installations/2/access_tokens")
      .reply(200, { token: "test" });

    // Test that a comment is posted
    nock("https://api.github.com")
      .get("/repos/myorg/myrepo/pulls/22/commits")
      .reply(200, commitsPayload);

    nock("https://api.github.com")
      .post("/repos/myorg/myrepo/issues/22/labels", [
        "feat",
        "bad",
        "fix",
        "awesome"
      ])
      .reply(200);

    // Receive a webhook event
    await probot.receive({
      name: "pull_request.opened",
      payload: pullRequestOpenedPayload
    });
  });
});
