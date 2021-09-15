const { _genId } = require("../schema/queries/private");
const driver = require("../neo4jDriver");
const descriptions = require("./data/tagDescriptions");

const getDescription = tag => descriptions[String(tag).toLowerCase()] || "";

const purgeDb = () => ({ query: `MATCH (n) DETACH DELETE n` });

const createTag = ({ name }) => ({
  query:
    "CREATE (tag:Tag {description: {description}, name: {name}, id: {tagId} }) RETURN tag",
  params: { description: getDescription(name), name, tagId: _genId() }
});

const setTagChild = ({ src, tgt }) => ({
  query: `
    MATCH (tag:Tag {name: {name} })
    MATCH (target: Tag {name: {targetValue}})
    CREATE (tag)-[tagging:TAGGING {id: {taggingId}, description: {description}}]->(target)
    RETURN tagging, tag, target
    `,
  params: {
    name: src,
    description: "",
    targetLabel: "Tag",
    targetKey: "name",
    targetValue: tgt,
    taggingId: _genId()
  }
});

const addTagChild = ({ description, src, tgt }) => {
  return [createTag({ description, name: tgt }), setTagChild({ src, tgt })];
};

const commands = [
  purgeDb(),
  createTag({ name: "Devops" }),
  addTagChild({ src: "Devops", tgt: "AWS" }),
  addTagChild({ src: "Devops", tgt: "Kubernetes" }),
  createTag({ name: "Datastorage" }),
  addTagChild({ src: "Datastorage", tgt: "SQL" }),
  addTagChild({ src: "SQL", tgt: "Postgresql" }),
  addTagChild({ src: "SQL", tgt: "Mysql" }),
  addTagChild({ src: "Datastorage", tgt: "NoSQL" }),
  addTagChild({ src: "NoSQL", tgt: "MongoDB" }),
  addTagChild({ src: "Datastorage", tgt: "Graph databases" }),
  addTagChild({ src: "Graph databases", tgt: "Neo4J" }),
  createTag({ name: "Web development" }),
  addTagChild({ src: "Web development", tgt: "Architecture" }),
  addTagChild({ src: "Architecture", tgt: "REST" }),
  addTagChild({ src: "Architecture", tgt: "Graphql" }),
  addTagChild({ src: "Web development", tgt: "Frontend" }),
  addTagChild({ src: "Frontend", tgt: "Frameworks" }),
  addTagChild({ src: "Frameworks", tgt: "React" }),
  addTagChild({ src: "Frontend", tgt: "State management" }),
  addTagChild({ src: "State management", tgt: "Redux" }),
  addTagChild({ src: "Redux", tgt: "Redux-saga" }),
  addTagChild({ src: "Redux", tgt: "Redux-thunk" }),
  addTagChild({ src: "State management", tgt: "Mobx" }),
  addTagChild({ src: "Web development", tgt: "Backend" }),
  addTagChild({ src: "Backend", tgt: "NodeJS" }),
  addTagChild({ src: "NodeJS", tgt: "ExpressJS" }),
  addTagChild({ src: "Backend", tgt: "Ruby" }),
  addTagChild({ src: "Ruby", tgt: "Rails" }),
  addTagChild({ src: "Web development", tgt: "Content management (CMS)" }),
  addTagChild({ src: "Content management (CMS)", tgt: "Wordpress" }),
  addTagChild({ src: "Content management (CMS)", tgt: "Drupal" })
];

const runSeed = async () => {
  const session = driver.session();
  const flattenedCommands = [].concat(...commands);

  console.log("\n");
  flattenedCommands.forEach(async ({ query, params }) => {
    console.log({ query, params });
    console.log("\n");
    await session.run(query, params);
  });

  await session.close();
  console.log(`${flattenedCommands.length} commands executed`);
};

runSeed();
