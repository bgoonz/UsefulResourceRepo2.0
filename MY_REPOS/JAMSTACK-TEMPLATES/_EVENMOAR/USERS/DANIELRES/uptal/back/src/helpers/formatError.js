const isNeo4jError = err =>
  err.extensions &&
  err.extensions.exception &&
  err.extensions.exception.name === "Neo4jError";

const isNeo4jConstraintError = err =>
  isNeo4jError(err) &&
  err.extensions.exception.code ===
    "Neo.ClientError.Schema.ConstraintValidationFailed";

const formatError = err => {
  console.error(err);
  if (isNeo4jConstraintError(err)) {
    const myRegexp = /Node.*label `(.*)` and property `(.*)` = '(.*)'/g;
    const match = myRegexp.exec(err);
    const [, type, field, value] = match;
    return new Error(`This ${field} is not available.`);
  }

  // Don't give neo4J errors to the client.
  if (isNeo4jError(err)) {
    return new Error("Something went wrong");
  }

  // Don't give unformatted/unfiltered errors to the client.
  return new Error("Something went wrong");
};

module.exports = formatError;
