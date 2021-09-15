"use strict";

var bodyParser = require('body-parser');

var express = require('express');

var pool = require('../db-tools/pool');

var router = express.Router();

var _require = require('../db-tools/sql-paths'),
    getSqlFile = _require.getSqlFile;

router.use(bodyParser.urlencoded({
  extended: false
}));

function handleError(e, data, property, fileName) {
  console.error(e);
  data[property] = "An error occurred while running the SQL in ".concat(fileName, " that reads \"").concat(e.message, "\". Check the console for errors.");
}

router.post('/', function _callee(req, res) {
  var newInstructionSqlFileName, _req$body, recipe_id, specification, data, newInstructionSql, parameters;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newInstructionSqlFileName = '05-insert-new-instruction.sql';
          _req$body = req.body, recipe_id = _req$body.recipe_id, specification = _req$body.specification;
          data = {};
          _context.next = 5;
          return regeneratorRuntime.awrap(getSqlFile(newInstructionSqlFileName));

        case 5:
          newInstructionSql = _context.sent;

          if (!(newInstructionSql.length === 0)) {
            _context.next = 10;
            break;
          }

          data.newInstructionError = "No SQL in ".concat(newInstructionSqlFileName);
          _context.next = 19;
          break;

        case 10:
          _context.prev = 10;
          parameters = [specification, recipe_id];
          _context.next = 14;
          return regeneratorRuntime.awrap(pool.query(newInstructionSql, parameters));

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](10);
          handleError(_context.t0, data, 'newInstructionError', newInstructionSqlFileName);

        case 19:
          if (data.newInstructionError) {
            res.redirect("/recipes/".concat(recipe_id, "/edit?instructionInsertError=").concat(data.newInstructionError));
          } else {
            res.redirect("/recipes/".concat(recipe_id, "/edit"));
          }

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 16]]);
});
module.exports = router;