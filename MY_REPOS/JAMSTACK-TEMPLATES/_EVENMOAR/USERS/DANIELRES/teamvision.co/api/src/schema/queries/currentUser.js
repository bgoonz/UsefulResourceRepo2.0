const { _genId, _getRecord } = require("./private");

const createCurrentUserPerson = email => {
  const params = { email, personId: _genId() };
  // Use cypher FOREACH hack to only set id for person if it isn't already set
  const query = `
    MERGE (person:Person {email: {email} })
    FOREACH (doThis IN CASE WHEN not(exists(person.id)) THEN [1] ELSE [] END |
      SET person += {id:{personId}, created:timestamp()})
    RETURN person
  `;
  return _getRecord(query, params);
};

const updateCurrentUserPersonName = ({ name }, email) => {
  const params = { email, name, personId: _genId() };
  // Use cypher FOREACH hack to only set id for person if it isn't already set
  const query = `
    MERGE (person:Person {email: {email} })
    FOREACH (doThis IN CASE WHEN not(exists(person.id)) THEN [1] ELSE [] END |
      SET person += {id:{personId}, created:timestamp()})
    SET person.name = {name}
    RETURN person
  `;
  return _getRecord(query, params);
};

module.exports = {
  createCurrentUserPerson,
  updateCurrentUserPersonName
};
