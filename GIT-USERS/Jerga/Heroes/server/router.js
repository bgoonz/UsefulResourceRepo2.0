const jsonService = require("./services/jsonService.js");
const heroesController = require("./controllers/heroes-control.js");

module.exports = function (app) {
  app.post("/hero/rel", heroesController.setRelation);
  app.post("/hero", heroesController.createHero);
  app.get("/heroes", heroesController.fetchHeroes);
};
