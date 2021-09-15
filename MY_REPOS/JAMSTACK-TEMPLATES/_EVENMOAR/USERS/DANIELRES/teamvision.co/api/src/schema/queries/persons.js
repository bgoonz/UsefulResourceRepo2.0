const yup = require("yup");

const { UniqueConstraintError } = require("../../errors");

const {
  _findNodesByLabelAndProperty,
  _genId,
  _getRecord,
  _getRecords
} = require("./private");

const PersonSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  personId: yup
    .string()
    .required()
    .min(10),
  name: yup
    .string()
    .required()
    .min(3),
  headline: yup
    .string()
    .min(3)
    .nullable(),
  currentPosition: yup
    .string()
    .min(3)
    .nullable(),
  picture: yup
    .string()
    .url()
    .nullable()
});

const createPerson = async ({
  email,
  name,
  picture,
  headline,
  currentPosition
}) => {
  const params = {
    createdAt: new Date().toISOString(),
    email,
    name,
    picture: picture && picture.length ? picture : null,
    headline: headline || null,
    currentPosition: currentPosition || null,
    personId: _genId()
  };

  await PersonSchema.validate(params, { abortEarly: false });
  const existing = await _findNodesByLabelAndProperty("Person", "email", email);
  if (existing.length)
    throw new UniqueConstraintError("This email is not available.");

  const query = `
    CREATE (p:Person)
    SET p.id = {personId}
    SET p.email = {email}
    SET p.name = {name}
    SET p.picture = {picture}
    SET p.headline = {headline}
    SET p.currentPosition = {currentPosition}
    SET p.createdAt = {createdAt}
    RETURN p
    `;
  return _getRecord(query, params);
};

const updatePerson = async ({ id, ...rest }) => {
  const operations = Object.entries(rest)
    .map(([k, v]) => `SET p.${k} = {${k}}`)
    .join("\n");

  const query = `
    MATCH (p:Person {id: {id}})
    ${operations}
    RETURN p
    `;

  return _getRecord(query, { id, ...rest });
};

const searchPersons = term => {
  const query = `
    MATCH (p:Person)
    WHERE
      (
        toLower(p.name) CONTAINS toLower({term})
        OR
        toLower(p.email) CONTAINS toLower({term})
      )
    RETURN p
  `;
  return _getRecords(query, { term });
};

module.exports = {
  searchPersons,
  createPerson,
  updatePerson
};
