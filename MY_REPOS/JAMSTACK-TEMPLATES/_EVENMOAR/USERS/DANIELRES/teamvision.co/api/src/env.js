const dotenv = require("dotenv");
const envalid = require("envalid");

if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

if (process.env.GRAPHENEDB_BOLT_URL)
  process.env.NEO4J_URL = process.env.GRAPHENEDB_BOLT_URL;
if (process.env.GRAPHENEDB_BOLT_USER)
  process.env.NEO4J_USER = process.env.GRAPHENEDB_BOLT_USER;
if (process.env.GRAPHENEDB_BOLT_PASSWORD)
  process.env.NEO4J_PASSWORD = process.env.GRAPHENEDB_BOLT_PASSWORD;

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development.local" });
  dotenv.config({ path: ".env.development" });
}

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test.local" });
  dotenv.config({ path: ".env.test" });
  dotenv.config({ path: ".env.development.local" });
  dotenv.config({ path: ".env.development" });
}

const { bool, port, str, url } = envalid;

const testLocalDesc = "Must be set in .env.test.local";

const env = envalid.cleanEnv(
  process.env,
  {
    NODE_ENV: str({
      choices: ["development", "production", "staging", "test"]
    }),
    AUTH0_AUDIENCE: str(),
    AUTH0_ISSUER: url(),
    AUTH0_JKWS_URI: url(),
    AUTH0_GET_USER_INFO: bool(),
    PORT: port(),
    NEO4J_URL: url(),
    NEO4J_USER: str(),
    NEO4J_PASSWORD: str(),
    ...(process.env.NODE_ENV === "test" && {
      AUTH0_TEST_CLIENT_ID: str({ desc: testLocalDesc }),
      AUTH0_TEST_CLIENT_SECRET: str({ desc: testLocalDesc })
    })
  },
  {
    strict: true
  }
);

module.exports = env;
