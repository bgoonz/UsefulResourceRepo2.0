const test = require("tape");
const execQuery = require("./support/execQuery");
const { deleteAllRecords } = require("../src/schema/queries");

const createTag = ({ name, description }) =>
  execQuery(`
    mutation {
      createTag(name: "${name}", description: "${description}") {
        name description
      }
    }
  `);

test("Query { tags {...} } works", async assert => {
  await deleteAllRecords();

  const { body } = await execQuery(`{ tags { name } }`);
  const expected = { data: { tags: [] } };

  assert.deepEqual(body, expected);
  assert.end();
});

test("Query { tags(search:...) {...} } works", async assert => {
  await deleteAllRecords();

  await createTag({ name: "Dog" });
  await createTag({ name: "Bigdog" });
  await createTag({ name: "Cat" });

  const { body } = await execQuery(`{ tags(search: "dog") { name } }`);
  const expected = { data: { tags: [{ name: "Bigdog" }, { name: "Dog" }] } };

  assert.deepEqual(body, expected);
  assert.end();
});

test("Query { tag(name|id:...) {...} } returns the tag", async assert => {
  await deleteAllRecords();

  const created = await execQuery(
    `mutation { createTag(name: "Salty") {id name description} }`
  );

  const { body: byName } = await execQuery(`{ tag(name: "Salty") { name } }`);
  assert.deepEqual(byName, { data: { tag: { name: "Salty" } } });

  const { id } = created.body.data.createTag;
  const { body: byId } = await execQuery(`{ tag(id: "${id}") { id } }`);
  assert.deepEqual(byId, { data: { tag: { id } } });

  assert.end();
});

test("Mutation { createTag {...} } works", async assert => {
  await deleteAllRecords();

  const name = "Tag1";
  const description = "Description";
  const { body } = await createTag({ name, description });

  const expected = { data: { createTag: { name, description } } };
  assert.deepEqual(body, expected);
  assert.end();
});

test("Mutation { createTag {...} } has unique name constraint", async assert => {
  await deleteAllRecords();

  const description = "Description";
  const name = "TagName";

  await createTag({ name });
  const { body } = await createTag({ name });

  assert.deepEqual(
    body.errors[0].extensions.exception.name,
    "UniqueConstraintError"
  );
  assert.deepEqual(body.errors[0].message, "This tag already exists.");

  assert.end();
});
