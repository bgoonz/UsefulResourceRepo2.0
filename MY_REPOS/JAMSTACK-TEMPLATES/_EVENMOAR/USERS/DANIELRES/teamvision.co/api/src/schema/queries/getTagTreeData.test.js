const test = require("tape");

const execQuery = require("../../../tests/support/execQuery");

const {
  applyTagging,
  createPerson,
  createTag,
  deleteAllRecords,
  getTagTreeData,
  setTagOn,
  updateTagging
} = require(".");

test("getTagTreeData() returns all tags, orphans, roots + taggings + metrics", async assert => {
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

  const result1 = await getTagTreeData();

  const expected1 = {
    tags: {
      all: ["Child1", "Orphan", "Parent1", "Root1"],
      orphans: ["Orphan", "Root1"],
      roots: ["Root1"],
      metrics: { skills: [], motivations: [] }
    },
    taggings: [
      { id: parent1_child1.id, src: "Parent1", tgt: "Child1" },
      { id: root1_parent1.id, src: "Root1", tgt: "Parent1" }
    ]
  };

  assert.deepEqual(result1, expected1);

  assert.end();
});

test("getTagTreeData().metrics returns correct skills and motivations", async assert => {
  await deleteAllRecords();
  const tom = await createPerson({ email: "tom@example.com", name: "Tom" });
  const jane = await createPerson({ email: "jane@example.com", name: "Jane" });

  const tagging1 = await setTagOn({
    tagName: "Cooking",
    on: "motivations",
    targetType: "Person",
    targetId: tom.id
  });
  const tagging2 = await setTagOn({
    tagName: "Cooking",
    on: "skills",
    targetType: "Person",
    targetId: jane.id
  });
  const tagging3 = await setTagOn({
    tagName: "Cooking",
    on: "motivations",
    targetType: "Person",
    targetId: jane.id
  });

  await updateTagging({ id: tagging1.id, level: 45 });
  await updateTagging({ id: tagging2.id, level: 100 });
  await updateTagging({ id: tagging3.id, level: 100 });

  const actual = await getTagTreeData();

  const expected = {
    tags: {
      all: ["Cooking"],
      orphans: ["Cooking"],
      roots: [],
      metrics: {
        skills: [
          {
            tag: "Cooking",
            level: 100,
            count: 1
          }
        ],
        motivations: [
          {
            tag: "Cooking",
            level: 40,
            count: 1
          },
          {
            tag: "Cooking",
            level: 100,
            count: 1
          }
        ]
      }
    },
    taggings: []
  };

  assert.deepEqual(actual, expected);

  assert.end();
});
