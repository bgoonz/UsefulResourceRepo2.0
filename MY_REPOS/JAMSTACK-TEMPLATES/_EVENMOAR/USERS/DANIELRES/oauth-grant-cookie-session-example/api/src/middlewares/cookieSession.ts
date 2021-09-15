import cookieSession from "cookie-session";
import config from "../config";

const { MAX_AGE_MINUTES, KEY1, KEY2, NAME } = config.auth.cookie;
const { SECURE } = config;

export default cookieSession({
  name: NAME,
  keys: [KEY1, KEY2],
  httpOnly: true,
  secure: SECURE,
  maxAge: MAX_AGE_MINUTES * 60 * 1000,
});
