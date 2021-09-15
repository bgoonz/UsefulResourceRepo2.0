
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
  checkParkForm,
  checkValidationMessage,
  setDomElements,
  postRequestWithCSRFToken,
} = require('./utils/form');

// Example Pug template:

// +validationErrorSummary(errors)
// form(action=`/park/edit/${park.id}` method='post')
//   include park-form-fields.pug
//   div(class='py-4')
//     button(type='submit' class='btn btn-primary') Update Park
//     a(href=`/park/${park.id}` class='btn btn-warning ml-2') Cancel

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

    // Test that the `/park/edit/:id(\\d+)` `GET` route
    // returns a response containing the expected HTML.

    describe('`/park/edit/:id(\\\\d+)` `GET` route', () => {
      // Use the first park in the test data.
      const [park] = parksData;
      const route = `/park/edit/${park.id}`;

      before(async () => {
        // Force the creation of the database
        // and populate the database with data.
        await sequelize.sync({ force: true });
        await queryInterface.bulkInsert('Parks', parksData);

        // Make a request to the `/park/edit/:id(\\d+)` route.
        const res = await request(app)
          .get(route)
          .expect('Content-type', /html/)
          .expect(200);

        setDomElements(res);
      });

      checkHeading('Edit Park');
      checkParkForm(route, 'Update Park', `/park/${park.id}`, park);
    });

    // Test that the `/park/edit/:id(\\d+)` `POST` route...

    describe('`/park/edit/:id(\\\\d+)` `POST` route', () => {

      // Returns the expected validation messages
      // when posting incomplete or bad form data.

      describe('with no values', () => {
        const park = {
          ...parksData[0],
          parkName: '',
          city: '',
          provinceState: '',
          country: '',
          opened: '',
          size: '',
          description: '',
        };
        const route = `/park/edit/${park.id}`;

        before(async () => {
          // Force the creation of the database
          // and populate the database with data.
          await sequelize.sync({ force: true });
          await queryInterface.bulkInsert('Parks', parksData);

          await postRequestWithCSRFToken(route, app, park);
        });

        checkHeading('Edit Park');
        checkParkForm(route, 'Update Park', `/park/${park.id}`, park);

        describe('should render a validation messages summary containing', () => {
          checkValidationMessage('Please provide a value for Park Name');
          checkValidationMessage('Please provide a value for City');
          checkValidationMessage('Please provide a value for Province/State');
          checkValidationMessage('Please provide a value for Country');
          checkValidationMessage('Please provide a value for Opened');
          checkValidationMessage('Please provide a valid date for Opened');
          checkValidationMessage('Please provide a value for Size');
          checkValidationMessage('Please provide a value for Description');
        });
      });

      // Returns the expected validation messages
      // when posting values that are too long.

      describe('with long values', () => {
        const string256 = 'a'.repeat(256);
        const string101 = 'a'.repeat(101);

        const park = {
          ...parksData[0],
          parkName: string256,
          city: string101,
          provinceState: string101,
          country: string101,
          size: string101,
        };
        const route = `/park/edit/${park.id}`;

        before(async () => {
          // Force the creation of the database
          // and populate the database with data.
          await sequelize.sync({ force: true });
          await queryInterface.bulkInsert('Parks', parksData);

          await postRequestWithCSRFToken(route, app, park);
        });

        checkHeading('Edit Park');
        checkParkForm(route, 'Update Park', `/park/${park.id}`, park);

        describe('should render a validation messages summary containing', () => {
          checkValidationMessage('Park Name must not be more than 255 characters long');
          checkValidationMessage('City must not be more than 100 characters long');
          checkValidationMessage('Province/State must not be more than 100 characters long');
          checkValidationMessage('Country must not be more than 100 characters long');
          checkValidationMessage('Size must not be more than 100 characters long');
        });
      });

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
            .get(`/park/edit/${park.id}`)
            .expect('Content-type', /html/)
            .expect(200);

          // Make a `POST` request.
          const postResponse = await agent
            .post(`/park/edit/${park.id}`)
            .expect('Content-type', /html/)
            .expect(403);

          setDomElements(postResponse);
        });

        checkHeading('Server Error');
      });

      // Test that the `/park/edit/:id(\\d+)` `POST` route
      // persists the updated park record to the database
      // when all validations pass.

      describe('with values', () => {
        const park = {
          ...parksData[0],
          parkName: 'Test Park',
          city: 'Portland',
          provinceState: 'Oregon',
          country: 'USA',
          opened: '2000-01-01',
          size: '100 acres',
          description: 'This is a very cool park.',
        };

        before(async () => {
          // Force the creation of the database
          // and populate the database with data.
          await sequelize.sync({ force: true });
          await queryInterface.bulkInsert('Parks', parksData);

          await postRequestWithCSRFToken(`/park/edit/${park.id}`, app, park, /text/, `/park/${park.id}`, 302);
        });

        it('should persist the updated park to the database', async () => {
          const result = await sequelize.query('SELECT * FROM Parks WHERE id = ?;', { replacements: [park.id] });
          const [[updatedPark]] = result;

          // Remove the `createdAt` and `updatedAt` properties
          // from both park records.
          const {
            createdAt: createdAt1,
            updatedAt: updatedAt1,
            ...parkWithoutAuditProperties
          } = park;
          const {
            createdAt: createdAt2,
            updatedAt: updatedAt2,
            ...updatedParkWithoutAuditProperties
          } = updatedPark;

          // ...and do a deep comparison to the original park object.
          expect(parkWithoutAuditProperties)
            .to.deep.equal(updatedParkWithoutAuditProperties);
        });
      });
    });
  });
};

runSpecs();
