import validateConfig from "@danielres/validate-config";

const { env } = process;

const SECURE = env.SECURE !== "false";

const config = {
  PORT: [env.PORT_API, "port"],
  PUBLIC_ROUTES: [["/", "/login", "/logout"], "array"],
  SECURE: [SECURE, "boolean"],

  auth: {
    cookie: {
      KEY1: [env.API_AUTH_COOKIE_KEY1_SECRET, "secret"],
      KEY2: [env.API_AUTH_COOKIE_KEY2_SECRET, "secret"],
      MAX_AGE_MINUTES: [env.API_AUTH_COOKIE_MAX_AGE_MINUTES, "number"],
      NAME: [env.API_AUTH_COOKIE_NAME, "string"],
    },
  },

  grant: {
    defaults: {
      origin: [env.GRANT_DEFAULTS_ORIGIN, "string"],
    },
    google: {
      key: [env.GRANT_GOOGLE_KEY, "secret"],
      secret: [env.GRANT_GOOGLE_SECRET, "secret"],
      response: [["tokens", "profile"], "array"],
      scope: [["openid", "email", "profile"], "array"],
    },
  },
};

const customValidators = {
  array: [Array.isArray, (v: unknown[]) => v, "should be an array"],

  port: [
    (v: number) => Number.isInteger(v) && v > 0,
    Number,
    "should be a positive integer",
  ],

  secret: [
    (v: string) => typeof v === "string" && v.length > 20,
    String,
    "should be a string of lenght > 30",
  ],
};

export default validateConfig(customValidators)(config);
