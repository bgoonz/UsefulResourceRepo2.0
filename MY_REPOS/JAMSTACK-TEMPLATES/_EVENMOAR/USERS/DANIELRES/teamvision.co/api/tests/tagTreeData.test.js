const test = require("tape");
const execQuery = require("./support/execQuery");
const { deleteAllRecords } = require("../src/schema/queries");

const { createTag, applyTagging } = require("../src/schema/queries");

test("Query { tagTreeData {...} } returns all tags, orphans, roots + taggings", async assert => {
  await deleteAllRecords();
  await createTag({ name: "root1" });
  await createTag({ name: "parent1" });
  await createTag({ name: "child1" });
  await createTag({ name: "orphan" });
  const root1_parent1 = await applyTagging({
    name: "root1",
    targetValue: "parent1"
  });
  const parent1_child1 = await applyTagging({
    name: "parent1",
    targetValue: "child1"
  });

  const result = await execQuery(`
    {
      tagTreeData {
        tags { all orphans roots }
        taggings { id src tgt }
      }
    }
  `);

  const expected = {
    tags: {
      all: ["Child1", "Orphan", "Parent1", "Root1"],
      orphans: ["Orphan", "Root1"],
      roots: ["Root1"]
    },
    taggings: [
      { id: parent1_child1.id, src: "Parent1", tgt: "Child1" },
      { id: root1_parent1.id, src: "Root1", tgt: "Parent1" }
    ]
  };

  assert.deepEqual(result.body.data.tagTreeData, expected);

  assert.end();
});
