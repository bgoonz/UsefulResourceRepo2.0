const jsonService = require("./services/jsonService.js");

module.exports = function (app) {
  app.get("/cars/getnumcars", function (req, res) {
    jsonService.getCarsJson(function (json) {
      res.send(jsonService.getNumOfCars(json));
    });
  });

  app.get("/cars", function (req, res) {
    var json;
    res.setHeader("Content-Type", "application/json");

    jsonService.getCarsJson(function (json) {
      res.send(jsonService.getParOfJson(json, req.query.page));
    });
  });
};
