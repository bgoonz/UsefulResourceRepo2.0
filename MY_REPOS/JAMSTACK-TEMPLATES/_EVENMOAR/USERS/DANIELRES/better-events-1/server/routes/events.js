var express = require("express");
var router = express.Router();
var db = require("../db/bookshelf");

/* GET users listing. */
router.get("/:eventCode", function (req, res, next) {
  db.findEventByEventCode(req.params["eventCode"]).then((event) =>
    res.json({
      event,
    })
  );
});

module.exports = router;
