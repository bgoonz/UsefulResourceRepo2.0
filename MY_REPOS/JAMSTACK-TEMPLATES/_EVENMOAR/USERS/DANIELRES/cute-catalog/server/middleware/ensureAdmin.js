const ServerError = require("../ServerError");

const findUserById = require("../queries/findUserById");

const ensureAdminMiddleware = async (req, res, next) => {
  const { userId } = req.decoded;
  const currentUser = await findUserById(userId);
  if (currentUser.isAdmin) return next();

  next(ServerError(401, "Unauthorized"));
};

module.exports = ensureAdminMiddleware;
