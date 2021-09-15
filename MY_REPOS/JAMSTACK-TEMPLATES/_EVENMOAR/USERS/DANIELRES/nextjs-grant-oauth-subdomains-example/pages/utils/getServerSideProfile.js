import { runMiddlewareCookieSession } from "../api/utils/runMiddlewareCookieSession";

export const getServerSideProfile = async (context) => {
  const { req, res } = context;
  await runMiddlewareCookieSession(req, res);
  const profile = req.session?.profile;
  if (!profile) return null;
  const { name, email, picture } = profile;
  return { name, email, picture };
};
