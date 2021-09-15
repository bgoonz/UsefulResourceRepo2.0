const test = require("tape");
const execQuery = require("./support/execQuery");
const { deleteAllRecords } = require("../src/schema/queries");

test("Query { persons {...} } works", async assert => {
  await deleteAllRecords();

  const { body } = await execQuery(`{ persons { email } }`);
  const expected = { data: { persons: [] } };

  assert.deepEqual(body, expected);

  assert.end();
});

test("Mutation { createPerson {...} } works", async assert => {
  await deleteAllRecords();

  const email = "test@example.com";
  const name = "TestName";

  const { body } = await execQuery(`
    mutation {
      createPerson(email: "${email}", name: "${name}") {
        email
        name
      }
    }
    `);

  const expected = {
    data: { createPerson: { email, name } }
  };

  assert.deepEqual(body, expected);

  assert.end();
});

test("Mutation { createPerson {...} } has unique email constraint", async assert => {
  await deleteAllRecords();

  const email = "test@example.com";
  const name = "TestName";

  await execQuery(`
    mutation { createPerson(email: "${email}", name: "${name}") { email name }}
  `);

  const { body } = await execQuery(`
    mutation { createPerson(email: "${email}", name: "${name}") { email name }}
  `);

  assert.deepEqual(
    body.errors[0].extensions.exception.name,
    "UniqueConstraintError"
  );
  assert.deepEqual(body.errors[0].message, "This email is not available.");

  assert.end();
});
