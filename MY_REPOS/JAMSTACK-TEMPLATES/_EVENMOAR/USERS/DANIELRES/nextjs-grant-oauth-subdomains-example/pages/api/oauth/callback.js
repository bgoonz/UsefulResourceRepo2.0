import Session from "grant/lib/session";
import * as config from "../config";
import { runMiddlewareCookieSession } from "../utils/runMiddlewareCookieSession";

module.exports = async (req, res) => {
  const session = Session({ secret: config.cookieSession.secret })(req);

  delete req.cookies; // prevent parsed req.cookies from confusing grant
  const { grant } = await session.get();

  await runMiddlewareCookieSession(req, res);

  req.session.profile = grant.response.profile;

  const location = grant?.dynamic?.redirect ?? `//${req.headers.host}`;
  res.writeHead(302, { location });
  res.end();
};
