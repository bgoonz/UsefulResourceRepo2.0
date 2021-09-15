const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const request = require("supertest");

const {
  addTestDatabaseConfig,
  loadModule,
  suppressRequestLogging,
} = require("./utils");
const {
  checkHeading,
  checkParkForm,
  checkValidationMessage,
  setDomElements,
  postRequestWithCSRFToken,
} = require("./utils/form");

// Example Pug template:

// mixin validationErrorSummary(errors)
//   if errors
//     div(class='alert alert-danger' role='alert')
//       p The following error(s) occurred:
//       ul
//         each error in errors
//           li= error

// mixin textField(labelText, fieldName, fieldValue, isMultiline, placeholder)
//   div(class='form-group')
//     label(for=fieldName)= labelText
//     if isMultiline
//       textarea(id=fieldName name=fieldName class='form-control' rows='5')= fieldValue
//     else
//       input(type='text' id=fieldName name=fieldName value=fieldValue placeholder=placeholder class='form-control')

// input(type='hidden' name='_csrf' value=csrfToken)
// +textField('Park Name', 'parkName', park.parkName)
// +textField('City', 'city', park.city)
// +textField('Province/State', 'provinceState', park.provinceState)
// +textField('Country', 'country', park.country)
// +textField('Opened', 'opened', park.opened, false, 'ex: 2000-01-31')
// +textField('Size', 'size', park.size)
// +textField('Description', 'description', park.description, true)

// +validationErrorSummary(errors)
// form(action='/park/add' method='post')
//   include park-form-fields.pug
//   div(class='py-4')
//     button(type='submit' class='btn btn-primary') Add Park
//     a(href='/' class='btn btn-warning ml-2') Cancel

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

  // Test that the `db/models` module exists.

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

    // Test that the `/park/add` `GET` route
    // returns a response containing the expected HTML.

    describe("`/park/add` `GET` route", () => {
      // NOTE: The `db.Park.build({})` method is used to create
      // the `Park` model instance that's passed to the
      // `park-add` view. Passing an empty object to the `build()`
      // method results in all of the model instance properties
      // being `undefined` which results in the `<input>`
      // element `value` attributes not being rendered.
      const park = {
        // parkName: '',
        // city: '',
        // provinceState: '',
        // country: '',
        // opened: '',
        // size: '',
        description: "",
      };

      before(async () => {
        // Force the creation of the database.
        await sequelize.sync({ force: true });

        // Make a request to the `/park/add` route.
        const res = await request(app)
          .get("/park/add")
          .expect("Content-type", /html/)
          .expect(200);

        setDomElements(res);
      });

      checkHeading("Add Park");
      checkParkForm("/park/add", "Add Park", "/", park);
    });

    // Test that the `/park/add` `POST` route...

    describe("`/park/add` `POST` route", () => {
      // Returns the expected validation messages
      // when posting incomplete or bad form data.

      describe("with no values", () => {
        const park = {
          parkName: "",
          city: "",
          provinceState: "",
          country: "",
          opened: "",
          size: "",
          description: "",
        };

        before(async () => {
          // Force the creation of the database.
          await sequelize.sync({ force: true });

          await postRequestWithCSRFToken("/park/add", app, park);
        });

        checkHeading("Add Park");
        checkParkForm("/park/add", "Add Park", "/", park);

        describe("should render a validation messages summary containing", () => {
          checkValidationMessage("Please provide a value for Park Name");
          checkValidationMessage("Please provide a value for City");
          checkValidationMessage("Please provide a value for Province/State");
          checkValidationMessage("Please provide a value for Country");
          checkValidationMessage("Please provide a value for Opened");
          checkValidationMessage("Please provide a valid date for Opened");
          checkValidationMessage("Please provide a value for Size");
          checkValidationMessage("Please provide a value for Description");
        });
      });

      // Returns the expected validation messages
      // when posting values that are too long.

      describe("with long values", () => {
        const string256 = "a".repeat(256);
        const string101 = "a".repeat(101);

        const park = {
          parkName: string256,
          city: string101,
          provinceState: string101,
          country: string101,
          opened: "",
          size: string101,
          description: "",
        };

        before(async () => {
          // Force the creation of the database.
          await sequelize.sync({ force: true });

          await postRequestWithCSRFToken("/park/add", app, park);
        });

        checkHeading("Add Park");
        checkParkForm("/park/add", "Add Park", "/", park);

        describe("should render a validation messages summary containing", () => {
          checkValidationMessage(
            "Park Name must not be more than 255 characters long"
          );
          checkValidationMessage(
            "City must not be more than 100 characters long"
          );
          checkValidationMessage(
            "Province/State must not be more than 100 characters long"
          );
          checkValidationMessage(
            "Country must not be more than 100 characters long"
          );
          checkValidationMessage(
            "Size must not be more than 100 characters long"
          );
        });
      });

      // Returns a 403 server error
      // when posting without including a CSRF token.

      describe("with no CSRF token", () => {
        before(async () => {
          // Force the creation of the database.
          await sequelize.sync({ force: true });

          const agent = request.agent(app);

          // Make a `GET` request.
          await agent
            .get("/park/add")
            .expect("Content-type", /html/)
            .expect(200);

          // Make a `POST` request.
          const postResponse = await agent
            .post("/park/add")
            .expect("Content-type", /html/)
            .expect(403);

          setDomElements(postResponse);
        });

        checkHeading("Server Error");
      });

      // Test that the `/park/add` `POST` route
      // persists the park record to the database
      // when all validations pass.

      describe("with values", () => {
        const park = {
          parkName: "Test Park",
          city: "Portland",
          provinceState: "Oregon",
          country: "USA",
          opened: "2000-01-01",
          size: "100 acres",
          description: "This is a very cool park.",
        };

        before(async () => {
          // Force the creation of the database.
          await sequelize.sync({ force: true });

          await postRequestWithCSRFToken(
            "/park/add",
            app,
            park,
            /text/,
            "/",
            302
          );
        });

        it("should persist the park to the database", async () => {
          const result = await sequelize.query("SELECT * FROM Parks;");
          const [parks] = result;

          // The database wasn't seeded with data
          // so the newly inserted record should be
          // the only record in the table.
          expect(parks.length).to.equal(1);

          const [newPark] = parks;

          // The new park's `id` should be "1".
          expect(newPark.id).to.equal(1);

          // Remove the `id`, `createdAt`, and `updatedAt` properties...
          const { id, createdAt, updatedAt, ...parkWithoutId } = newPark;

          // ...and do a deep comparison to the original park object.
          expect(parkWithoutId).to.deep.equal(park);
        });
      });
    });
  });
};

runSpecs();
