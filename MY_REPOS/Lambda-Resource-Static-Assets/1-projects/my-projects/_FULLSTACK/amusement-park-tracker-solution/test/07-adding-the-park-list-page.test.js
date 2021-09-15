/* eslint-disable no-loop-func */

const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const request = require("supertest");
const cheerio = require("cheerio");

const { parks: parksData } = require("./data");
const {
  addTestDatabaseConfig,
  loadModule,
  suppressRequestLogging,
} = require("./utils");
const { checkHeading, setDomElements } = require("./utils/form");

const runSpecs = () => {
  let bail = false;
  let app = null;
  let models = null;

  // Test that the `config/database` module exists.

  describe("`config/database` module", () => {
    const database = loadModule("../config/database");

    if (database === null) {
      bail = true;
      return;
    }

    addTestDatabaseConfig(database);
  });

  if (bail) return;

  // Test that the `db/models` module exists
  // and exports the expected properties
  // (i.e. `Sequelize` and `sequelize`).

  describe("`db/models` module", () => {
    models = loadModule("../db/models");

    if (models === null) {
      bail = true;
    }
  });

  if (bail) return;

  let sequelize = null;

  // Test that the Park model exists.

  describe("`Park` model", () => {
    ({ sequelize } = models);
    const { Park } = models;

    it("should exist", () => {
      expect(Park).to.not.be.undefined;
    });

    if (Park === undefined) {
      bail = true;
    }
  });

  if (bail) return;

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

    describe("`/parks` route", () => {
      let $ = null;
      let parks = null;

      before(async () => {
        // Force the creation of the database
        // and populate the database with data.
        await sequelize.sync({ force: true });
        const queryInterface = sequelize.getQueryInterface();
        await queryInterface.bulkInsert("Parks", parksData);

        // Query the list of parks
        // (used later to test the rendered table).
        const result = await sequelize.query(
          "SELECT * FROM Parks ORDER BY parkName;"
        );
        [parks] = result;

        // Make a request to the `/parks` route.
        const res = await request(app)
          .get("/parks")
          .expect("Content-type", /html/)
          .expect(200);

        $ = setDomElements(res);
      });

      // Example Pug template:

      // div(class='py-3')
      //   a(class='btn btn-success' href='/park/add' role='button') Add Park
      // table(class='table table-striped table-hover')
      //   thead(class='thead-dark')
      //     tr
      //       th(scope='col') Park Name
      //       th(scope='col') Location
      //       th(scope='col') Opened
      //       th(scope='col')
      //   tbody
      //     each park in parks
      //       tr
      //         td= park.parkName
      //         td= `${park.city}, ${park.provinceState} ${park.country}`
      //         td= park.opened
      //         td= (park.attractions.length || 0)
      //         td: a(class='btn btn-primary' href=`/park/${park.id}` role='button') Details

      checkHeading("Parks");

      it('should render an "Add Park" hyperlink (`<a>` element) with an `href` attribute set to "/park/add"', () => {
        const addParkHyperlink = $('a[href="/park/add"]');
        expect(addParkHyperlink.length).to.equal(1);
        expect(addParkHyperlink.text()).to.equal("Add Park");
      });

      describe("should render a table", () => {
        describe("containing a header row", () => {
          let parksTableHeaderRow = null;
          let cells = null;

          before(() => {
            parksTableHeaderRow = $("table thead tr");
            cells = $("table thead tr th");
          });

          it("that exists", () => {
            expect(parksTableHeaderRow.length).to.equal(1);
          });

          // Example:

          // th(scope='col') Park Name
          // th(scope='col') Location
          // th(scope='col') Opened
          // th(scope='col')

          it('cell 1 contains the text "Park Name"', () => {
            expect(cells.eq(0).text()).to.equal("Park Name");
          });

          it('cell 2 contains the text "Location"', () => {
            expect(cells.eq(1).text()).to.equal("Location");
          });

          it('cell 3 contains the text "Opened"', () => {
            expect(cells.eq(2).text()).to.equal("Opened");
          });

          it('cell 4 contains the text ""', () => {
            expect(cells.eq(3).text()).to.equal("");
          });
        });

        describe("containing rows", () => {
          let parksTableRows = null;

          before(() => {
            parksTableRows = $("table tbody tr");
          });

          it("for each of the available parks", () => {
            expect(parksTableRows.length).to.equal(parksData.length);
          });

          // NOTE: Looping over the imported parks data
          // instead of the queried list of parks because
          // this loop will executes BEFORE any of the async
          // `before()` or `beforeEach()` methods are executed.
          for (let index = 0; index < parksData.length; index += 1) {
            const rowNumber = index + 1;

            describe(`row ${rowNumber}`, () => {
              let park = null;
              let cells = null;

              before(() => {
                // NOTE: Getting the reference to the park
                // for this index needs to be done within
                // a `before()` method call to ensure that the
                // above `before()` method call that retrieves
                // the parks data from the database has completed.
                park = parks[index];
                cells = $("td", parksTableRows.eq(index));
              });

              it("should contain 4 table cells", () => {
                expect(cells.length).to.equal(4);
              });

              // td= park.parkName
              // td= `${park.city}, ${park.provinceState} ${park.country}`
              // td= park.opened
              // td: a(class='btn btn-primary' href=`/park/${park.id}` role='button') Details

              it(`row ${rowNumber} cell 1 contains the \`parkName\` property value`, () => {
                expect(cells.eq(0).text()).to.equal(park.parkName);
              });

              it(`row ${rowNumber} cell 2 contains the interpolated string "\`$\{park.city}, $\{park.provinceState} $\{park.country}\`"`, () => {
                expect(cells.eq(1).text()).to.equal(
                  `${park.city}, ${park.provinceState} ${park.country}`
                );
              });

              it(`row ${rowNumber} cell 3 contains the \`opened\` property value`, () => {
                expect(cells.eq(2).text()).to.equal(park.opened);
              });

              it(`row ${rowNumber} cell 4 contains a "Details" hyperlink (\`<a>\` element) with an \`href\` attribute set to "/park/$\{park.id}"`, () => {
                const detailsHyperlink = $(
                  `a[href="/park/${park.id}"]`,
                  cells.eq(3)
                );
                expect(detailsHyperlink.length).to.equal(1);
                expect(detailsHyperlink.text()).to.equal("Details");
              });
            });
          } // End of the `for` loop.
        });
      });
    });
  });
};

runSpecs();
