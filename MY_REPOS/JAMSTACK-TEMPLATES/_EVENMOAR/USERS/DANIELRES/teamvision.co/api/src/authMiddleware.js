const { verifyToken, getUserInfoCached } = require("./auth");
const { AuthenticationError } = require("apollo-server-express");

const env = require("./env");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.teamvis_jwt;

  if (!token) return next();

  try {
    const decoded = await verifyToken(token);

    const expires = new Date(decoded.exp * 1000);
    res.cookie("teamvis_jwt", token, {
      expires,
      httpOnly: true,
      ...(env.NODE_ENV === "production" && { secure: true })
    });
    res.cookie("teamvis_authenticated", true, { expires });

    req.isAuthenticated = true;

    if (env.AUTH0_GET_USER_INFO)
      req.userInfo = JSON.parse(await getUserInfoCached(token));

    next();
  } catch (error) {
    console.error(error);
    next(new AuthenticationError(error.message));
  }
};
