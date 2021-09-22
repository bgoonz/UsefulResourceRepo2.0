const csrf = require('csurf');

const csrfProtection = csrf({ cookie: { signed: true } });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

module.exports = {
  csrfProtection,
  asyncHandler,
};
