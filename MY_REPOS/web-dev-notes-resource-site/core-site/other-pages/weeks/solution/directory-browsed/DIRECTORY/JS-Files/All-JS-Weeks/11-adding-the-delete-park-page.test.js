
const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');

const { parks: parksData } = require('./data');
const {
  addTestDatabaseConfig,
  loadModule,
  suppressRequestLogging,
} = require('./utils');
const {
  checkHeading,
  checkForm,
  setDomElements,
  postRequestWithCSRFToken,
} = require('./utils/form');

// Example Pug template:

// h3= park.parkName
// div(class='py-4')
//   p Proceed with deleting this park?
// div
//   form(action=`/park/delete/${park.id}` method='post')
//     input(type='hidden' name='_csrf' value=csrfToken)
//     button(class='btn btn-danger' type='submit') Delete Park
//     a(class='btn btn-warning ml-2' href=`/park/${park.id}` role='button') Cancel

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

  // Test that the `db/models` module exists.

  describe('`db/models` module', () => {
    models = loadModule('../db/models');

    if (models === null) {
      bail = true;
    }
  });

  if (bail) return;

  let sequelize = null;
  let queryInterface = null;

  // Test that the Park model exists.

  describe('`Park` model', () => {
    ({ sequelize } = models);
    queryInterface = sequelize.getQueryInterface();
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

    // Test that the `/park/delete/:id(\\d+)` `GET` route
    // returns a response containing the expected HTML.

    describe('`/park/delete/:id(\\\\d+)` `GET` route', () => {
      let $ = null;

      // Use the first park in the test data.
      const [park] = parksData;
      const route = `/park/delete/${park.id}`;

      before(async () => {
        // Force the creation of the database
        // and populate the database with data.
        await sequelize.sync({ force: true });
        await queryInterface.bulkInsert('Parks', parksData);

        // Make a request to the `/park/delete/:id(\\d+)` route.
        const res = await request(app)
          .get(route)
          .expect('Content-type', /html/)
          .expect(200);

        $ = setDomElements(res);
      });

      checkHeading('Delete Park');
      checkHeading(park.parkName, 3);

      it('should render a paragraph (`<p>` element) containing the text "Proceed with deleting this park?"', () => {
        const paragraph = $('p:contains("Proceed with deleting this park?")');
        expect(paragraph.length).to.equal(1);
      });

      checkForm(route, 'Delete Park', `/park/${park.id}`);
    });

    // Test that the `/park/delete/:id(\\d+)` `POST` route...

    describe('`/park/delete/:id(\\\\d+)` `POST` route', () => {

      // Returns a 403 server error
      // when posting without including a CSRF token.

      describe('with no CSRF token', () => {
        // Use the first park in the test data.
        const [park] = parksData;

        before(async () => {
          // Force the creation of the database
          // and populate the database with data.
          await sequelize.sync({ force: true });
          await queryInterface.bulkInsert('Parks', parksData);

          const agent = request.agent(app);

          // Make a `GET` request.
          await agent
            .get(`/park/delete/${park.id}`)
            .expect('Content-type', /html/)
            .expect(200);

          // Make a `POST` request.
          const postResponse = await agent
            .post(`/park/delete/${park.id}`)
            .expect('Content-type', /html/)
            .expect(403);

          setDomElements(postResponse);
        });

        checkHeading('Server Error');
      });

      // Test that the `/park/delete/:id(\\d+)` `POST` route
      // deletes the park record from the database.

      describe('with valid POST request', () => {
        // Use the first park in the test data.
        const [park] = parksData;

        before(async () => {
          // Force the creation of the database
          // and populate the database with data.
          await sequelize.sync({ force: true });
          await queryInterface.bulkInsert('Parks', parksData);

          await postRequestWithCSRFToken(`/park/delete/${park.id}`, app, park, /text/, '/parks', 302);
        });

        it('should delete the park from the database', async () => {
          const result = await sequelize.query('SELECT * FROM Parks WHERE id = ?;', { replacements: [park.id] });

          expect(result[0].length).to.equal(0);
        });
      });
    });
  });
};

runSpecs();
