const env = require("./env");

const neo4j = require("neo4j-driver").v1;

const logger = (level, operation) => {
  if (level === "debug" && operation.includes("RUN")) {
    console.info(
      operation
        .split("C: RUN")[1]
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length)
        .join("\n") + "\n"
    );
  }
};

const driver = neo4j.driver(
  env.NEO4J_URL,
  neo4j.auth.basic(env.NEO4J_USER, env.NEO4J_PASSWORD),
  {
    disableLosslessIntegers: true,
    logging: { level: "debug", logger }
  }
);

module.exports = driver;
