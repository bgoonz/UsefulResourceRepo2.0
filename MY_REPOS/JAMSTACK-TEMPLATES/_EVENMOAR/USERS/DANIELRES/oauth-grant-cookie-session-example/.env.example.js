if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
const { NODE_ENV } = process.env;

const PORT_BASE = 3000;
const PORT_API = PORT_BASE + 1000;

const env = {
  PORT_API,

  API_AUTH_COOKIE_KEY1_SECRET: undefined, // CHANGE ME IN .env.js
  API_AUTH_COOKIE_KEY2_SECRET: undefined, // CHANGE ME IN .env.js
  API_AUTH_COOKIE_MAX_AGE_MINUTES: 60,
  API_AUTH_COOKIE_NAME: "session_cookie",

  GRANT_DEFAULTS_ORIGIN: `http://localhost:${PORT_API}`,
  GRANT_GOOGLE_KEY: undefined, // CHANGE ME IN .env.js
  GRANT_GOOGLE_SECRET: undefined, // CHANGE ME IN .env.js

  SECURE: false,
};

module.exports = env;
