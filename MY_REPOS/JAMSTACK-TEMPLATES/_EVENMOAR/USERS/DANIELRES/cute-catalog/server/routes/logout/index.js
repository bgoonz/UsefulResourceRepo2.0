const express = require("express");

const ServerError = require("../../ServerError");

const router = express.Router();

router.post("/", (req, res, next) => {
  try {
    res.clearCookie("auth");
    res.clearCookie("authExpiresAt");
    res.json({ success: true });
  } catch (e) {
    next(ServerError(500, "Logout error", e));
  }
});

module.exports = router;
