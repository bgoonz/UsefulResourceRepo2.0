if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
const { NODE_ENV } = process.env;

const PORT_BASE = 3000;

const env = {
  PORT_UI: PORT_BASE,
  PORT_API: PORT_BASE + 1000,
  PORT_PG_ADMINER: 8000,
  PORT_PG: 8001,

  API_AUTH_COOKIE_KEY1_SECRET: "secret-hgvkgvsdjbad9876svdhkasq",
  API_AUTH_COOKIE_KEY2_SECRET: "secret-870oh3beucgTTIFCKJuihoew",
  API_AUTH_COOKIE_MAX_AGE_MINUTES: 60,

  BCRYPT_SALT_ROUNDS: 1,

  PG_DB: `proto_${NODE_ENV}`,
  PG_PASSWORD: "proto",
  PG_USER: "proto",

  SECURE: false,
};

env.CORS_ORIGIN = `http://localhost:${env.PORT_UI}`;
env.PG_URL = `postgresql://${env.PG_USER}:${env.PG_PASSWORD}@localhost:${env.PORT_PG}/${env.PG_DB}?schema=public`;

env.NEXT_PUBLIC_GRAPHQL_URL = `http://localhost:${env.PORT_API}/graphql`;

module.exports = env;
