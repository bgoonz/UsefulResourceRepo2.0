import Grant from "grant";
import * as config from "../config";

module.exports = async (req, res) => {
  const secret = config.cookieSession.secret;
  const grant = Grant.vercel({ config: config.grant, session: { secret } });
  delete req.cookies; // fix grant confused by req.cookies parsed by nextjs
  grant(req, res);
};
