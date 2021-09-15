const { _getRecord, _getRecords } = require("./private");

const findNodeByLabelAndId = (label, id) => {
  const query = `
    MATCH (n:${label} {id: {id}})
    RETURN n
  `;
  return _getRecord(query, { id });
};

const findNodeByLabelAndProperty = (label, key, value) => {
  const query = `
    MATCH (n:${label} {${key}: {value}})
    RETURN n
  `;
  return _getRecord(query, { value });
};

const findNodesByLabel = label => {
  const query = `
    MATCH (n:${label})
    RETURN n ORDER BY n.created DESC
  `;
  return _getRecords(query, { label });
};

module.exports = {
  findNodeByLabelAndId,
  findNodeByLabelAndProperty,
  findNodesByLabel
};
