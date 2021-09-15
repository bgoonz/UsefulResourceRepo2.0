// This file contains functions that should be used only by queries
// and not required directly

const nanoid = require("nanoid");
const driver = require("../../neo4jDriver");

const _execQuery = async (query, params = {}) => {
  const session = driver.session();
  const { records: rawRecords } = await session.run(query, {});
  session.close();
  return rawRecords;
};

const _genId = () => nanoid(10);

const _getRecords = async (query, params) => {
  const session = driver.session();
  const { records } = await session.run(query, params);
  session.close();

  return records.map(r => {
    const { properties, labels } = r.get(0);
    return { ...properties };
  });
};

const _getRecord = async (query, params) => {
  const records = await _getRecords(query, params);
  return records && records.length === 1 ? records[0] : null;
};

const _getRelationships = async (query, params) => {
  const session = driver.session();
  const { records: relationships } = await session.run(query, params);
  session.close();

  return relationships.map(r => {
    const { properties, type } = r.get(0);
    return { ...properties, type };
  });
};

const _findNodesByLabelAndProperty = (label, key, value) => {
  const query = `
    MATCH (n:${label} {${key}: {value}})
    RETURN n
  `;
  return _getRecords(query, { value });
};

module.exports = {
  _execQuery,
  _findNodesByLabelAndProperty,
  _genId,
  _getRecord,
  _getRecords,
  _getRelationships
};
