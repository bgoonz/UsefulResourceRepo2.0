require("../db/init");
const closeDb = require("../db/test/closeDb");
const truncateTables = require("../db/test/truncateTables");

const createUserByEmailPassword = require("./createUserByEmailPassword");
const findUserByEmailPassword = require("./findUserByEmailPassword");

afterAll(closeDb);
beforeEach(truncateTables);

describe("findUserByEmailPassword()", () => {
  it("finds a user by email with an encrypted password", async () => {
    const params = {
      email: "john@example.com",
      name: "John Doe",
      password: "shhhhhhhhhh",
    };
    const dbUser = await createUserByEmailPassword(params);

    expect(dbUser.password.length).toEqual(60);

    const user = await findUserByEmailPassword({
      email: "john@example.com",
      password: "shhhhhhhhhh",
    });

    expect(user.id).toEqual(dbUser.id);
  });

  describe("with wrong email", () => {
    it("returns null", async () => {
      const params = {
        email: "john@examplae.com",
        name: "John Doe",
        password: "shhhhhhhhhh",
      };
      const dbUser = await createUserByEmailPassword(params);

      expect(dbUser.password.length).toEqual(60);

      const user = await findUserByEmailPassword({
        email: "WRONG",
        password: "shhhhhhhhhh",
      });

      expect(user).toBeNull();
    });
  });

  describe("with wrong password", () => {
    it("returns null", async () => {
      const params = {
        email: "john@examplae.com",
        name: "John Doe",
        password: "shhhhhhhhhh",
      };
      const dbUser = await createUserByEmailPassword(params);

      expect(dbUser.password.length).toEqual(60);

      const user = await findUserByEmailPassword({
        email: "john@example.com",
        password: "WRONG",
      });

      expect(user).toBeNull();
    });
  });
});
