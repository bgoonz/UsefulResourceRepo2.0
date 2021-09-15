const chai = require("chai");
const cheerio = require("cheerio");
const request = require("supertest");

const haveTag = require("./utils/have-tag-with-attribute");
const haveSelectWithOption = require("./utils/have-select-with-option");
const htmlCollector = require("./utils/html-collector");

const { app } = require("../app.js");
const { expect } = chai;

chai.use(haveTag);
chai.use(haveSelectWithOption);

describe("The submission page", () => {
  let token = null;
  let cookies = null;
  let option1Value = null;
  let csrfError = null;
  let optionError = null;
  beforeEach(async () => {
    if (!app) return;

    const getRes = await request(app).get("/pasta/create");
    cookies = getRes.headers["set-cookie"];
    const $ = cheerio.load(getRes.text);

    try {
      const csrf = $("input[type='hidden'][name='_csrf']");
      if (csrf.length === 0) {
        csrfError = new Error("Could not find a _csrf field to use to submit.");
      }
      token = csrf.attr("value");
    } catch (e) {
      csrfError = new Error("Could not find a _csrf field to use to submit.");
    }

    try {
      const options1 = $('select[name="noodleId"] option');
      const option1 = $(options1[Math.floor(options1.length * Math.random())]);
      option1Value = option1.attr("value");

      const options2 = $('select[name="sauceId"] option');
      const option2 = $(options2[Math.floor(options2.length * Math.random())]);
      option2Value = option2.attr("value");

      if (!option1Value) {
        optionError = new Error(
          "Could not find a select dropdown with noodleIds to use to submit."
        );
      }

      if (!option2Value) {
        optionError = new Error(
          "Could not find a select dropdown with sauceIds to use to submit."
        );
      }
    } catch (e) {
      optionError = new Error(
        "Could not find a select dropdown with noodleIds or sauceIds to use to submit."
      );
    }
  });

  it("can accept a valid submission with label, sauceId, and noodleId and get redirected", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send("label=AppAcademy")
      .send("sauceId=1")
      .send("noodleId=1")
      .expect(302, done);
  });

  it("can accept a valid submission with label, sauceId, description, and noodleId and get redirected", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send("label=App")
      .send("description=This+is+a+description")
      .send("sauceId=1")
      .send("noodleId=1")
      .expect(302, done);
  });

  it("can accept a valid submission with label, sauceId, description, taste, and noodleId and get redirected", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send("label=App")
      .send("sauceId=1")
      .send("description=This+is+a+description")
      .send("taste=8")
      .send("noodleId=1")
      .expect(302, done);
  });

  it("returns a 500 for missing label data", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send("sauceId=1")
      .send("noodleId=1")
      .expect(500, done);
  });

  it("returns a 500 for a too-long label", (done) => {
    if (!app) {
      return done(Error('Cannot read "app" from app.js'));
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send(
        `label=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
      )
      .send("sauceId=1")
      .send("description=This+is+a+description")
      .send("taste=8")
      .send("noodleId=1")
      .expect(500, done);
  });

  it("returns a 500 for missing sauceId data", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send("label=App")
      .send("noodleId=1")
      .expect(500, done);
  });

  it("returns a 500 for missing noodleId data", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send("label=App")
      .send("sauceId=1")
      .expect(500, done);
  });

  it("returns a 500 for unknown noodleId data", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send("label=App")
      .send("sauceId=1")
      .send("description=This+is+a+description")
      .send("taste=8")
      .send(`noodleId=0.123`)
      .expect(500, done);
  });

  it("returns a 500 for unknown sauceId data", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send(`_csrf=${token}`)
      .send("label=App")
      .send("sauceId=0.123")
      .send("description=This+is+a+description")
      .send("taste=8")
      .send(`noodleId=1`)
      .expect(500, done);
  });

  it("returns a 403 for a missing CSRF token", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    if (csrfError || optionError) {
      return done(csrfError || optionError);
    }

    request(app)
      .post("/pasta/create")
      .set("Cookie", cookies)
      .send("label=App")
      .send("sauceId=1")
      .expect(403, done);
  });
});
