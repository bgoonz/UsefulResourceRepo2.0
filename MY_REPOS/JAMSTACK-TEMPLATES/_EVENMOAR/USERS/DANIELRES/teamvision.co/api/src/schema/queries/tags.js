const yup = require("yup");

const { UniqueConstraintError } = require("../../errors");
const { upperFirst } = require("../../helpers/strings");
const {
  _findNodesByLabelAndProperty,
  _genId,
  _getRecord,
  _getRecords
} = require("./private");

const TagSchema = yup.object().shape({
  description: yup.string(),
  tagId: yup
    .string()
    .required()
    .min(10),
  name: yup
    .string()
    .required()
    .min(2)
});

const createTag = async ({ description = "", name }) => {
  const params = { description, name: upperFirst(name), tagId: _genId() };

  await TagSchema.validate(params, { abortEarly: false });
  const existing = await _findNodesByLabelAndProperty("Tag", "name", name);
  if (existing.length)
    throw new UniqueConstraintError("This tag already exists.");

  const query = `CREATE (tag:Tag {description: {description}, name: {name}, id: {tagId} }) RETURN tag`;
  return _getRecord(query, params);
};

const searchTags = term => {
  const query = `MATCH (t:Tag) WHERE toLower(t.name) CONTAINS toLower({term}) RETURN t ORDER BY t.name`;
  return _getRecords(query, { term });
};

module.exports = {
  searchTags,
  createTag
};
