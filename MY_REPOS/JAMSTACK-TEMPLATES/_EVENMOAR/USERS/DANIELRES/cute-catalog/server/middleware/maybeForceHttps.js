const maybeForceHttpsMiddleware = async (req, res, next) => {
  if (process.env.ALLOW_HTTP === "true") return next();
  if (req.header("x-forwarded-proto") !== "https")
    res.redirect(`https://${req.header("host")}${req.url}`);
  next();
};

module.exports = maybeForceHttpsMiddleware;
