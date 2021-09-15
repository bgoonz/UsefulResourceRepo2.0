const driver = require("../../neo4jDriver");
const { _execQuery } = require("./private");
const flatten = require("lodash/flatten");

const getAllTaggings = async () => {
  const query = `
    MATCH (src:Tag) -[rel:TAGGING]-> (tgt:Tag)
    RETURN src, rel, tgt ORDER BY src.name`;
  const records = await _execQuery(query);
  return records.map(r => {
    const src = r.get("src").properties.name;
    const tgt = r.get("tgt").properties.name;
    const id = r.get("rel").properties.id;
    return { id, src, tgt };
  });
};

const getCount = async (segment, on) => {
  const query = `
    MATCH (t:Tag) -[tagging:TAGGING]-> (:Person)
    WHERE round(toFloat(tagging.level)/20) * 20 = ${segment}
    AND tagging.on = "${on}"
    RETURN t.name, count(tagging)
  `;
  const records = await _execQuery(query);

  const result = records.map(r => {
    const tag = r.get(0);
    const count = r.get(1);
    return { tag, level: segment, count };
  });

  return result;
};

const getCounts = async on => {
  const segments = [20, 40, 60, 80, 100];
  const result = await Promise.all(
    segments.map(segment => getCount(segment, on))
  );
  return flatten(result);
};

const getAllTags = async () => {
  const query = `MATCH (t:Tag) RETURN t ORDER BY t.name`;
  const records = await _execQuery(query);
  return records.map(r => {
    const tag = r.get("t").properties.name;
    return tag;
  });
};

const getTagTreeData = async () => {
  const allTags = await getAllTags();
  const taggings = await getAllTaggings();

  const skills = await getCounts("skills");
  const motivations = await getCounts("motivations");

  const sources = Object.values(taggings).map(t => t.src);
  const targets = Object.values(taggings).map(t => t.tgt);
  const orphans = allTags.filter(t => !targets.includes(t));
  const roots = orphans.filter(o => sources.includes(o));

  const result = {
    tags: {
      all: allTags,
      orphans,
      roots,
      metrics: { skills, motivations }
    },
    taggings
  };

  return result;
};

module.exports = getTagTreeData;
