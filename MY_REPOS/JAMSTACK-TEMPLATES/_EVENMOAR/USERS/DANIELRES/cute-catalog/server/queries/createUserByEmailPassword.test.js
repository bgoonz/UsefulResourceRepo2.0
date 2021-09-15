require("../db/init");
const closeDb = require("../db/test/closeDb");
const truncateTables = require("../db/test/truncateTables");
const User = require("../models/User");
const { ValidationError } = require("../models/User");

const createUserByEmailPassword = require("./createUserByEmailPassword");

afterAll(closeDb);
beforeEach(truncateTables);

describe("createUserByEmailPassword()", () => {
  it("creates a user by email with an encrypted password", async () => {
    const params = {
      email: "john@example.com",
      name: "John Doe",
      password: "shhhhhhhhhh",
    };

    const user1 = await createUserByEmailPassword(params);

    expect(user1.name).toEqual("John Doe");
    expect(user1.email).toEqual("john@example.com");
    expect(user1.password.length).toEqual(60);

    expect(await user1.verifyPassword("shhhhhhhhhh")).toEqual(true);
    expect(await user1.verifyPassword("wrong")).toEqual(false);
  });

  it("ensures email is unique", async (done) => {
    const params1 = {
      email: "john@example.com",
      name: "John Doe",
      password: "shhhhhhhhhh",
    };

    await createUserByEmailPassword(params1);

    const params2 = {
      email: "john@example.com",
      name: "John Doe 2",
      password: "shhhhhhhhhh2",
    };

    let error;
    try {
      await User.query().insert(params2);
    } catch (e) {
      error = e;
    }

    expect(error instanceof ValidationError).toEqual(true);
    expect(error.message).toEqual("Unique Validation Failed");
    expect(error.name).toEqual("ValidationError");
    expect(error.type).toEqual("ModelValidation");
    expect(error.data).toEqual({
      email: [{ keyword: "unique", message: "email already in use." }],
    });
    expect(error.statusCode).toEqual(400);

    done();
  });

  it("allows undefined password", async (done) => {
    const params1 = {
      email: "john@example.com",
      name: "John Doe",
    };
    const user = await createUserByEmailPassword(params1);

    expect(user.email).toEqual("john@example.com");
    expect(user.password).toEqual(undefined);

    done();
  });

  it("ensures password is at least 6 characters if defined", async (done) => {
    const params2 = {
      email: "john2@example.com",
      name: "John Doe",
      password: "a",
    };

    let error;
    try {
      await createUserByEmailPassword(params2);
    } catch (e) {
      error = e;
    }

    expect(error instanceof ValidationError).toEqual(true);
    expect(error.message).toEqual(
      "password: should NOT be shorter than 6 characters"
    );
    expect(error.name).toEqual("ValidationError");
    expect(error.type).toEqual("ModelValidation");
    expect(error.data).toEqual({
      password: [
        {
          keyword: "minLength",
          message: "should NOT be shorter than 6 characters",
          params: { limit: 6 },
        },
      ],
    });
    expect(error.statusCode).toEqual(400);

    done();
  });
});
