import cookieSession from "cookie-session";
import * as config from "../config";
import { parseHost } from "./parseHost";
import { runMiddleware } from "./runMiddleware";

export const runMiddlewareCookieSession = async (req, res) => {
  const { domain } = parseHost(req.headers.host);
  const mwCookieSession = cookieSession({ ...config.cookieSession, domain });
  await runMiddleware(req, res, mwCookieSession);

  // Extend the session life as long as the user is active (makes requests),
  // only changes every minute so that it's not sent with every request:
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
};
