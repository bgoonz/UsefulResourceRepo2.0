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

describe("The form page", () => {
  let pageContent = null;

  it("returns a 200", (done) => {
    if (!app) {
      expect.fail('Cannot read "app" from app.js');
    }

    request(app)
      .get("/pasta/create")
      .set("accept", "html")
      .buffer()
      .parse(htmlCollector)
      .expect((res) => (pageContent = res.body))
      .expect(200, done);
  });

  describe("shows a form", () => {
    it('with a method of "post" and an action of "/pasta/create"', () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }

      expect(pageContent).to.haveTag("form", "method", "post");
      expect(pageContent).to.haveTag("form", "action", "/pasta/create");
    });

    it("with a required label text field", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }

      expect(pageContent).to.haveTag('[name="label"]', "@name", "input");
      expect(pageContent).to.haveTag('[name="label"]', "required");
      expect(pageContent).to.haveTag('[name="label"]', "type", "text");
    });

    it("with a description textarea field", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }

      expect(pageContent).to.haveTag(
        '[name="description"]',
        "@name",
        "textarea"
      );
    });

    it("with an taste number field", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }

      expect(pageContent).to.haveTag('[name="taste"]', "@name", "input");
      expect(pageContent).to.haveTag('[name="taste"]', "type", "number");
    });

    it("with a sauceId select field", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }

      expect(pageContent).to.haveTag('[name="sauceId"]', "@name", "select");
      expect(pageContent).to.haveTag('[name="sauceId"]', "required");

      const options = [
        "Alfredo",
        "Bolognese",
        "Cheesy Bechamel",
        "Garlic Soy",
        "Brown Butter Sage",
        "Red Chili Broth",
      ];

      for (let option of options) {
        it(`with the option "${option}"`, () => {
          if (!app) {
            expect.fail('Cannot read "app" from app.js');
          }

          expect(pageContent).to.haveSelectWithOption(
            '[name="noodleId"]',
            option
          );
        });
      }
    });

    it("with a noodleId select field", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }

      expect(pageContent).to.haveTag('[name="noodleId"]', "@name", "select");
      expect(pageContent).to.haveTag('[name="noodleId"]', "required");

      const options = [
        "Linguini",
        "Fettucini",
        "Tortellini",
        "Ravioli",
        "Udon",
        "Ramen",
      ];

      for (let option of options) {
        it(`with the option "${option}"`, () => {
          if (!app) {
            expect.fail('Cannot read "app" from app.js');
          }

          expect(pageContent).to.haveSelectWithOption(
            '[name="noodleId"]',
            option
          );
        });
      }
    });

    it("with a hidden field named _csrf", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }

      expect(pageContent).to.haveTag('[name="_csrf"]', "@name", "input");
      expect(pageContent).to.haveTag('[name="_csrf"]', "type", "hidden");

      // it does not have an empty value
      expect(pageContent).to.haveTag('[name="_csrf"]', "value", /.+/);
    });

    it("with a submit button", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }

      expect(pageContent).to.haveTag("button", "type", "submit", true);
    });
  });
});
