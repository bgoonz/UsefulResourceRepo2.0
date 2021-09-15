require("../db/init");
const closeDb = require("../db/test/closeDb");
const truncateTables = require("../db/test/truncateTables");

const findOrCreateUserByFacebookId = require("./findOrCreateUserByFacebookId");

afterAll(closeDb);
beforeEach(truncateTables);

describe("findOrCreateUserByFacebookId()", () => {
  it("finds or creates a user by facebookId", async () => {
    const params = {
      facebookId: "12345667891234567",
      name: "John Doe",
      email: "john.example.com",
    };

    const user1 = await findOrCreateUserByFacebookId(params);

    expect(user1.facebookId).toEqual("12345667891234567");
    expect(user1.name).toEqual("John Doe");

    const user2 = await findOrCreateUserByFacebookId(params);

    expect(user1.id).toEqual(user2.id);
  });
});
