const test = require("tape");

const execQuery = require("../../../tests/support/execQuery");
const deleteAllRecords = require("./deleteAllRecords");
const { setTagParent } = require("./taggings");

const getTagTreeData = require("./getTagTreeData");
const {
  applyTagging,
  getTaggingsByTagName,
  setTagOn,
  updateTagging
} = require("./taggings");
const { createPerson } = require("./persons");
const { createTag, searchTags } = require("./tags");

test("setTagParent() creates, replaces or deletes the Tagging relationship", async assert => {
  await deleteAllRecords();
  await createTag({ name: "root" });
  await createTag({ name: "parent" });
  await createTag({ name: "child" });

  // 1) Creates Tagging relationships
  const r_p = await setTagParent({ parentName: "root", tagName: "parent" });
  const p_c = await setTagParent({ parentName: "parent", tagName: "child" });

  const tagTreeData = await getTagTreeData();

  assert.deepEqual(tagTreeData, {
    tags: {
      all: ["Child", "Parent", "Root"],
      orphans: ["Root"],
      roots: ["Root"],
      metrics: { skills: [], motivations: [] }
    },
    taggings: [
      { id: p_c.id, src: "Parent", tgt: "Child" },
      { id: r_p.id, src: "Root", tgt: "Parent" }
    ]
  });

  // 2) Deletes the Tagging relationship when parentName === null
  await setTagParent({ parentName: null, tagName: "parent" });

  const tagTreeData2 = await getTagTreeData();

  assert.deepEqual(tagTreeData2, {
    tags: {
      all: ["Child", "Parent", "Root"],
      orphans: ["Parent", "Root"],
      roots: ["Parent"],
      metrics: { skills: [], motivations: [] }
    },
    taggings: [{ id: p_c.id, src: "Parent", tgt: "Child" }]
  });

  // 3) Replaces the Tagging relationship
  const r_c = await setTagParent({ parentName: "root", tagName: "child" });

  const tagTreeData3 = await getTagTreeData();

  assert.deepEqual(tagTreeData3, {
    tags: {
      all: ["Child", "Parent", "Root"],
      orphans: ["Parent", "Root"],
      roots: ["Root"],
      metrics: { skills: [], motivations: [] }
    },
    taggings: [{ id: r_c.id, src: "Root", tgt: "Child" }]
  });

  assert.end();
});

test("setTagOn() creates a Tagging relationship with an existing, or a new tag", async assert => {
  await deleteAllRecords();
  const existing = await createTag({ name: "existingTag" });
  const person = await createPerson({ email: "tom@example.com", name: "Tom" });

  const taggingWithExistingTag = await setTagOn({
    tagName: "existingTag",
    on: "skills",
    targetType: "Person",
    targetId: person.id
  });

  assert.deepEqual(taggingWithExistingTag, {
    description: "",
    id: taggingWithExistingTag.id,
    on: "skills",
    tag: { name: "ExistingTag", description: "", id: existing.id },
    target: {
      label: "Person",
      name: "Tom",
      createdAt: person.createdAt,
      email: "tom@example.com",
      id: person.id
    }
  });

  const taggingWithNewTag = await setTagOn({
    tagName: "newTag",
    on: "motivations",
    targetType: "Person",
    targetId: person.id
  });

  const newTag = (await searchTags("newTag"))[0];

  assert.deepEqual(taggingWithNewTag, {
    description: "",
    id: taggingWithNewTag.id,
    on: "motivations",
    tag: { name: "NewTag", description: "", id: newTag.id },
    target: {
      label: "Person",
      name: "Tom",
      createdAt: person.createdAt,
      email: "tom@example.com",
      id: person.id
    }
  });

  assert.end();
});

test("getTaggingsByTagName({tagName}) returns all taggings for a given tag", async assert => {
  await deleteAllRecords();
  const tag = await createTag({ name: "Frontend" });
  const person = await createPerson({ email: "tom@example.com", name: "Tom" });

  const tagging1 = await setTagOn({
    tagName: "Frontend",
    on: "skills",
    targetType: "Person",
    targetId: person.id
  });

  const tagging2 = await setTagOn({
    tagName: "Frontend",
    on: "motivations",
    targetType: "Person",
    targetId: person.id
  });

  const expected = [
    {
      description: "",
      id: tagging2.id,
      on: "motivations",
      target: {
        name: "Tom",
        createdAt: person.createdAt,
        email: "tom@example.com",
        id: person.id,
        label: "Person"
      }
    },
    {
      description: "",
      id: tagging1.id,
      on: "skills",
      target: {
        name: "Tom",
        createdAt: person.createdAt,
        email: "tom@example.com",
        id: person.id,
        label: "Person"
      }
    }
  ];

  const actual = await getTaggingsByTagName({ tagName: "Frontend" });
  assert.deepEqual(actual, expected);
  assert.end();
});

test("updateTagging() updates an existing tagging level and/or description", async assert => {
  await deleteAllRecords();
  const tag = await createTag({ name: "Some tag" });
  const person = await createPerson({ email: "tom@example.com", name: "Tom" });

  const taggingV1 = await setTagOn({
    tagName: "Some tag",
    on: "skills",
    targetType: "Person",
    targetId: person.id
  });

  const { id } = taggingV1;

  const v2 = await updateTagging({ id, level: 40 });
  assert.deepEqual(v2, { id, description: "", level: 40, on: "skills" });

  const v3 = await updateTagging({ id, description: "Desc" });
  assert.deepEqual(v3, { id, description: "Desc", level: 40, on: "skills" });

  const v4 = await updateTagging({ id, level: null });
  assert.deepEqual(v4, { id, description: "Desc", on: "skills" });

  const v5 = await updateTagging({ id, level: 80, description: "Desc2" });
  assert.deepEqual(v5, { id, description: "Desc2", level: 80, on: "skills" });

  const v6 = await updateTagging({ id });
  assert.deepEqual(v6, { id, description: "Desc2", level: 80, on: "skills" });

  assert.end();
});
