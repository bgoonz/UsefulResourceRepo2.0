const test = require("tape");
const execQuery = require("./support/execQuery");
const {
  createPerson,
  createTag,
  deleteAllRecords
} = require("../src/schema/queries");

const applyTagging = ({
  name,
  description,
  targetLabel,
  targetKey,
  targetValue
}) =>
  execQuery(`
    mutation {
      applyTagging(
        name: "${name}",
        description: "${description}",
        targetLabel: "${targetLabel}",
        targetKey:"${targetKey}",
        targetValue:"${targetValue}"
      ) {
        id
        description
        tag{id name}
        target{
          ... on Person { id label email }
          ... on Tag  { id label name }
        }
      }
    }
  `);

test("Mutation { applyTagging {...} } works on a Tag", async assert => {
  await deleteAllRecords();

  const parent = await createTag({ name: "Parent" });
  const child = await createTag({ name: "Child" });

  const { body } = await applyTagging({
    name: "Parent",
    description: "Tagging description",
    targetLabel: "Tag",
    targetKey: "name",
    targetValue: "Child"
  });

  const taggingId = body.data.applyTagging.id;

  const expected = {
    data: {
      applyTagging: {
        id: taggingId,
        description: "Tagging description",
        tag: { id: parent.id, name: "Parent" },
        target: { id: child.id, label: "Tag", name: "Child" }
      }
    }
  };
  assert.deepEqual(body, expected);
  assert.end();
});

test("Mutation { applyTagging {...} } works on a Person", async assert => {
  await deleteAllRecords();

  const tag = await createTag({ name: "Smart" });
  const person = await createPerson({
    name: "John",
    email: "john@example.com"
  });

  const { body } = await applyTagging({
    name: "Smart",
    description: "John learned vegan rocket science at 4.",
    targetLabel: "Person",
    targetKey: "email",
    targetValue: "john@example.com"
  });

  const taggingId = body.data.applyTagging.id;

  const expected = {
    data: {
      applyTagging: {
        id: taggingId,
        description: "John learned vegan rocket science at 4.",
        tag: { id: tag.id, name: "Smart" },
        target: { id: person.id, label: "Person", email: "john@example.com" }
      }
    }
  };

  assert.deepEqual(body, expected);
  assert.end();
});

test("Mutation { applyTagging {...} } has a unique contraint per tag/target", async assert => {
  await deleteAllRecords();
  const tag = await createTag({ name: "Smart" });
  const person = await createPerson({
    name: "John",
    email: "john@example.com"
  });

  await applyTagging({
    name: "Smart",
    description: "John learned vegan rocket science at 4.",
    targetLabel: "Person",
    targetKey: "email",
    targetValue: "john@example.com"
  });

  const { body } = await applyTagging({
    name: "Smart",
    description: "John can divide by zero.",
    targetLabel: "Person",
    targetKey: "email",
    targetValue: "john@example.com"
  });

  assert.deepEqual(
    body.errors[0].extensions.exception.name,
    "UniqueConstraintError"
  );
  assert.deepEqual(
    body.errors[0].message,
    "A tag can be applied only once per target."
  );

  assert.end();
});
