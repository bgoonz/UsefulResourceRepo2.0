var express = require("express");
var router = express.Router();

router.get("/test", function (req, res) {
  res.render("test");
});

// handle sign up logic

module.exports = router;
