var express = require("express");
var router = express.Router();

//INDEX ROUTE - Show all camp grounds
router.get("/", function (req, res) {
  res.render("index");
});

module.exports = router;
