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

describe("The main page", () => {
  function randomName() {
    return (Math.random() * 1000).toString();
  }

  function randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  let label = null;
  let description = null;
  let taste = null;
  let csrfError = null;
  let optionError = null;
  let option1Value = null;
  let option1Text = null;
  let option2Value = null;
  let option2Text = null;
  let createError = null;
  let pageContent = null;

  function findNamedRow() {
    const rows = pageContent.split(/<\/?tr>/g);
    let namedRow = "";

    const nameRegex = new RegExp(`<td[^>]*>\s*${label}\s*</td>`);
    for (let row of rows) {
      if (nameRegex.test(row)) {
        namedRow = row;
        break;
      }
    }
    return namedRow;
  }

  before(async () => {
    if (!app) return;

    label = randomName();
    description = randomName();
    taste = randomNumber();

    const getRes = await request(app).get("/pasta/create");
    const cookies = getRes.headers["set-cookie"];
    const $ = cheerio.load(getRes.text);

    try {
      const csrf = $("input[type='hidden'][name='_csrf']");
      if (csrf.length === 0) {
        csrfError = new Error("Could not find a _csrf field to use to submit.");
      }
      token = csrf.attr("value");
    } catch (e) {
      csrfError = new Error("Could not find a _csrf field to use to submit.");
      return;
    }

    try {
      const options = $('select[name="noodleId"] option');
      const option = $(options[0]);
      option1Value = option.attr("value");
      option1Text = option.text();
    } catch (e) {
      optionError = new Error(
        "Could not find a select dropdown with noodles to use to submit."
      );
      return;
    }

    try {
      const options = $('select[name="sauceId"] option');
      const option = $(options[0]);
      option2Value = option.attr("value");
      option2Text = option.text();
    } catch (e) {
      optionError = new Error(
        "Could not find a select dropdown with sauces to use to submit."
      );
      return;
    }

    try {
      await request(app)
        .post("/pasta/create")
        .set("Cookie", cookies)
        .send(`_csrf=${token}`)
        .send(`label=${label}`)
        .send(`description=${description}`)
        .send(`taste=${taste}`)
        .send(`noodleId=${option1Value}`)
        .send(`sauceId=${option2Value}`)
        .expect(302);
    } catch (e) {
      createError = new Error(
        "Could not create a new pasta to test on the main screen"
      );
    }
  });

  it("returns a 200", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }
    request(app)
      .get("/")
      .set("accept", "html")
      .buffer()
      .parse(htmlCollector)
      .expect((res) => (pageContent = res.body))
      .expect(200, done);
  });

  describe("for an added pasta, contains a data cell with", () => {
    it("the label", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      const re = new RegExp(`<td[^>]*>\s*${label}\s*</td>`);
      expect(re.test(pageContent)).to.equal(
        true,
        `Could not find the label ${label} on the main page.`
      );
    });

    it("the description", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      let namedRow = findNamedRow();
      const descriptionRegex = new RegExp(`<td[^>]*>\s*${description}\s*</td>`);

      expect(descriptionRegex.test(namedRow)).to.equal(
        true,
        `Could not find the description "${description}" in the same table row as "${label}".`
      );
    });

    it("the taste", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      let namedRow = findNamedRow();
      const ageRegex = new RegExp(`<td[^>]*>\s*${taste}\s*</td>`);

      expect(ageRegex.test(namedRow)).to.equal(
        true,
        `Could not find the taste "${taste}" in the same table row as "${label}".`
      );
    });

    it("the noodle and a link to the noodle's page", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      let namedRow = findNamedRow();
      const noodleRegex = new RegExp(option1Text);
      const $ = cheerio.load(namedRow);

      expect(noodleRegex.test(namedRow)).to.equal(
        true,
        `Could not find the noodle "${option1Text}" in the same table row as "${label}".`
      );
      const link = $(`a[href="/noodle/${option1Value}"]`);
      linkText = link.text();
      expect(noodleRegex.test(linkText)).to.equal(
        true,
        `Could not find a link to the ${option1Text} noodle's page.`
      );
    });

    it("the sauce and a link to the sauce's page", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      let namedRow = findNamedRow();
      const sauceRegex = new RegExp(option2Text);
      const $ = cheerio.load(namedRow);

      expect(sauceRegex.test(namedRow)).to.equal(
        true,
        `Could not find the sauce "${option2Text}" in the same table row as "${label}".`
      );

      const link = $(`a[href="/sauce/${option2Value}"]`);
      linkText = link.text();
      expect(sauceRegex.test(linkText)).to.equal(
        true,
        `Could not find a link to the ${option2Text} sauce's page.`
      );
    });
  });
});
