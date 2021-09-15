const { verifyToken, getUserInfoCached } = require("./auth");

export default async (req, res, next) => {
  const token = req.headers.authorization;

  // if (!token) return next();

  try {
    const decoded = await verifyToken(token);
    req.user = JSON.parse(await getUserInfoCached(token));
    next();
  } catch (error) {
    console.error(error);
    return error;
  }
};
