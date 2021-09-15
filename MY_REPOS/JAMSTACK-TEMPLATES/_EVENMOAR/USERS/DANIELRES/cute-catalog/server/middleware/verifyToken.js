const jwt = require("jsonwebtoken");

const ServerError = require("../ServerError");

const veryfyTokenMiddleware = (req, res, next) => {
  jwt.verify(req.cookies.auth, process.env.AUTH_SECRET, (err, decoded) => {
    if (err) return next(ServerError(401, "Unauthorized", err));

    req.decoded = decoded;
    next();
  });
};

module.exports = veryfyTokenMiddleware;
