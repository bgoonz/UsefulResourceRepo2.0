const { validationResult } = require('express-validator');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array().map((error) => error.msg);

    return res.status(400).json({ errors });
  }

  return next();
};

module.exports = { asyncHandler, handleValidationErrors };
