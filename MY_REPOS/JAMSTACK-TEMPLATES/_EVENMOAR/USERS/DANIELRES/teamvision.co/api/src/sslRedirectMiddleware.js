module.exports = ({ env = "production", status = 302 } = {}) => (
  req,
  res,
  next
) => {
  if (process.env.NODE_ENV !== env) return next();

  if (req.headers["x-forwarded-proto"] !== "https")
    return res.redirect(status, `https://${req.hostname}${req.originalUrl}`);

  next();
};
