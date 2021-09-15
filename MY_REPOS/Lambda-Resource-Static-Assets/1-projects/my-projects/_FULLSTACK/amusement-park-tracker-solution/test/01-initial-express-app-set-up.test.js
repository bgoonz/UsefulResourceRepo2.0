const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const request = require("supertest");
const cheerio = require("cheerio");

const {
  addTestDatabaseConfigIfConfigDatabaseModuleExists,
  loadModule,
  suppressRequestLogging,
} = require("./utils");
const { checkHeading, setDomElements } = require("./utils/form");

const runSpecs = () => {
  let bail = false;
  let app = null;

  addTestDatabaseConfigIfConfigDatabaseModuleExists();

  // Test that the `app` module exists.

  describe("`app` module", () => {
    app = loadModule("../app");

    if (app === null) {
      bail = true;
      return;
    }

    suppressRequestLogging(app);
  });

  if (bail) return;

  // Test that the `routes` module exists.

  describe("`routes` module", () => {
    const routes = loadModule("../routes");

    if (routes === null) {
      bail = true;
      return;
    }

    // Test that the default route returns the expected response.

    describe("default (`/`) route", () => {
      let $ = null;
      before(async () => {
        const res = await request(app)
          .get("/")
          .expect("Content-type", /html/)
          .expect(200);

        $ = setDomElements(res);
      });

      it('should render an "Amusement Park Tracker" hyperlink (`<a>` element) with an `href` attribute set to "/" in the top navbar', () => {
        const homeHyperlink = $('nav a[href="/"]');
        expect(homeHyperlink.length).to.equal(1);
        expect(homeHyperlink.text()).to.equal("Amusement Park Tracker");
      });

      it('should render a "Parks" hyperlink (`<a>` element) with an `href` attribute set to "/parks" in the top navbar', () => {
        const parksHyperlink = $('ul a[href="/parks"]');
        expect(parksHyperlink.length).to.equal(1);
        expect(parksHyperlink.text()).to.equal("Parks");
      });

      checkHeading("Home");
    });
  });

  // if (bail) return;

  // Test that the `package.json` file
  // defines the expected `start` script.

  // describe('`package.json` file', () => {
  //   const fileContents = readFile(`${__dirname}/../package.json`);

  //   if (fileContents === null) {
  //     bail = true;
  //     return;
  //   }

  //   it('should define a `start` script that starts the application using the `nodemon` command', () => {
  //     expect(fileContents).to.match(/"start":\s*"nodemon \.\/bin\/www"/);
  //   });
  // });
};

runSpecs();
