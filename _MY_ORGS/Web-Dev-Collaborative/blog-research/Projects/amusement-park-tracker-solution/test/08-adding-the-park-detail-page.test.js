
const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');
const cheerio = require('cheerio');

const { parks: parksData } = require('./data');
const {
  addTestDatabaseConfig,
  loadModule,
  suppressRequestLogging,
} = require('./utils');
const {
  checkHeading,
  setDomElements,
} = require('./utils/form');

const runSpecs = () => {
  let bail = false;
  let app = null;
  let models = null;

  // Test that the `config/database` module exists.

  describe('`config/database` module', () => {
    const database = loadModule('../config/database');

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

  describe('`db/models` module', () => {
    models = loadModule('../db/models');

    if (models === null) {
      bail = true;
    }
  });

  if (bail) return;

  let sequelize = null;

  // Test that the Park model exists.

  describe('`Park` model', () => {
    ({ sequelize } = models);
    const { Park } = models;

    it('should exist', () => {
      expect(Park).to.not.be.undefined;
    });

    if (Park === undefined) {
      bail = true;
    }
  });

  if (bail) return;

  // Test that the `app` module exists.

  describe('`app` module', () => {
    app = loadModule('../app');

    if (app === null) {
      bail = true;
      return;
    }

    suppressRequestLogging(app);
  });

  if (bail) return;

  // Test that the `routes` module exists.

  describe('`routes` module', () => {
    const routes = loadModule('../routes');

    if (routes === null) {
      bail = true;
      return;
    }

    describe('`/park/:id(\\\\d+)` route', () => {
      let $ = null;

      // Use the first park in the test data.
      const [park] = parksData;

      before(async () => {
        // Force the creation of the database
        // and populate the database with data.
        await sequelize.sync({ force: true });
        const queryInterface = sequelize.getQueryInterface();
        await queryInterface.bulkInsert('Parks', parksData);

        // Make a request to the `/park/:id(\\d+)` route.
        const res = await request(app)
          .get(`/park/${park.id}`)
          .expect('Content-type', /html/)
          .expect(200);

        $ = setDomElements(res);
      });

      // Example Pug template:

      // h3= park.parkName
      // div
      //   ul
      //     li= `Location: ${park.city}, ${park.provinceState} ${park.country}`
      //     li= `Opened: ${park.opened}`
      //     li= `Size: ${park.size}`
      // div
      //   p= park.description
      // div(class='py-4')
      //   a(class='btn btn-primary' href=`/park/edit/${park.id}` role='button') Edit
      //   a(class='btn btn-danger ml-2' href=`/park/delete/${park.id}` role='button') Delete
      //   a(class='btn btn-warning ml-2' href='/' role='button') Return to List

      checkHeading('Park Detail');
      checkHeading(park.parkName, 3);

      describe('should display the park details (not including the `description`)', () => {
        it('within an unordered list (`<ul>`)', () => {
          const unorderedList = $('div.container div ul');
          expect(unorderedList.length).to.equal(1);
        });

        describe('with list item', () => {
          it('"1" containing the interpolated string "`Location: ${park.city}, ${park.provinceState} ${park.country}`"', () => {
            const listItem = $('div.container div ul li:nth-child(1)');
            expect(listItem.text()).to.equal(`Location: ${park.city}, ${park.provinceState} ${park.country}`);
          });

          it('"2" containing the interpolated string "`Opened: ${park.opened}`"', () => {
            const listItem = $('div.container div ul li:nth-child(2)');
            expect(listItem.text()).to.equal(`Opened: ${park.opened}`);
          });

          it('"3" containing the interpolated string "`Size: ${park.size}`"', () => {
            const listItem = $('div.container div ul li:nth-child(3)');
            expect(listItem.text()).to.equal(`Size: ${park.size}`);
          });
        });
      });

      it('should render a paragraph (`<p>` element) containing the `park.description` property value', () => {
        const paragraph = $('div p');
        expect(paragraph.text()).to.equal(park.description);
      });

      it('should render an "Edit" hyperlink (`<a>` element) with an `href` attribute set to "/park/edit/«park.id»"', () => {
        const editParkHyperlink = $(`div.container a[href="/park/edit/${park.id}"]`);
        expect(editParkHyperlink.length).to.equal(1);
        expect(editParkHyperlink.text()).to.equal('Edit');
      });

      it('should render a "Delete" hyperlink (`<a>` element) with an `href` attribute set to "/park/delete/«park.id»"', () => {
        const deleteParkHyperlink = $(`div.container a[href="/park/delete/${park.id}"]`);
        expect(deleteParkHyperlink.length).to.equal(1);
        expect(deleteParkHyperlink.text()).to.equal('Delete');
      });

      it('should render a "Return to List" hyperlink (`<a>` element) with an `href` attribute set to "/parks"', () => {
        const returnParkHyperlink = $('div.container a[href="/parks"]');
        expect(returnParkHyperlink.length).to.equal(1);
        expect(returnParkHyperlink.text()).to.equal('Return to List');
      });
    });
  });
};

runSpecs();
