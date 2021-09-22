const Heroes = require("../models/heroes.js");

exports.setRelation = function (req, res, next) {
  const name = req.body.heroName_rel;
  const yourHeroName = req.body.yourHeroName;
  const relationship = req.body.relationship_rel
    ? req.body.relationship_rel
    : "Unassigned";
  var heroesArr = [];

  if (!name) {
    res.status(422).send({ error: "You must enter a name" });
  }

  Heroes.find({}, function (err, heroes) {
    heroesArr = heroes;

    if (!findHero(heroesArr, name)) {
      let hero = new Heroes({
        name: name,
        relationships: [
          {
            name: yourHeroName,
            relationship: relationship,
          },
        ],
      });

      saveHero(hero);

      Heroes.findOne({ name: yourHeroName }, function (err, hero) {
        hero.relationships.push({
          name: name,
          relationship: relationship,
        });
        saveHero(hero);
        // res.send(hero);
      });
    } else {
      Heroes.findOne({ name: yourHeroName }, function (err, yourHero) {
        Heroes.findOne({ name: name }, function (err, hero) {
          if (modifeRelationship(hero, yourHeroName, relationship) === false) {
            hero.relationships.push({
              name: yourHeroName,
              relationship: relationship,
            });
            saveHero(hero);
          }
          if (modifeRelationship(yourHero, name, relationship) === false) {
            yourHero.relationships.push({
              name: name,
              relationship: relationship,
            });
            saveHero(yourHero);
          }
        });
      });
    }
    Heroes.find({}, function (err, heroes) {
      if (err) {
        throw err;
      } else {
        res.send(heroes);
      }
    });
  });
};

exports.createHero = function (req, res, next) {
  var otherHero;
  const name = req.body.heroName;
  const otherHeroName = req.body.relHero;
  const relationship = req.body.relationship
    ? req.body.relationship
    : "Unassigned";
  var heroesArr = [];

  if (!name) {
    res.status(422).send({ error: "You must enter a name" });
  }

  Heroes.find({}, function (err, heroes) {
    if (err) {
      res.status(422).send({ error: "Name already exist" });
    }

    heroesArr = heroes;

    if (name && !otherHeroName) {
      if (!findHero(heroesArr, name)) {
        let hero = new Heroes({
          name: name,
          relationships: otherHero
            ? [
                {
                  name: otherHeroName,
                  relationship: relationship,
                },
              ]
            : [],
        });

        saveHero(hero);
        res.send(hero);
      }
    }

    if (name && otherHeroName) {
      var heroes = {};
      let hero1,
        hero2 = {};

      if (!findHero(heroesArr, name)) {
        hero1 = new Heroes({
          name: name,
          relationships: [
            {
              name: otherHeroName,
              relationship: relationship,
            },
          ],
        });

        saveHero(hero1);
        heroes["0"] = hero1;
      }

      if (!findHero(heroesArr, otherHeroName)) {
        hero2 = new Heroes({
          name: otherHeroName,
          relationships: [
            {
              name: name,
              relationship: relationship,
            },
          ],
        });

        saveHero(hero2);
        heroes[1] = hero2;
      }

      res.send(heroes);
    }
  });
};

exports.fetchHeroes = function (req, res, next) {
  Heroes.find({}, function (err, heroes) {
    if (err) {
      res.status(422).send({ error: err });
    } else {
      res.send(heroes);
    }
  });
};

function saveHero(hero) {
  hero.save(function (err, user) {
    if (err) {
      throw err;
    }
  });
}

function findHero(heroArr, heroName) {
  return heroArr.find(function (hero) {
    return hero.name === heroName;
  });
}

function modifeRelationship(hero, name, relationship) {
  if (hero.relationships.length === 0) {
    hero.relationships.push({
      name: name,
      relationship: relationship,
    });
    saveHero(hero);
    return true;
  }

  return hero.relationships.some(function (rel) {
    if (rel.name === name) {
      rel.relationship = relationship;
      saveHero(hero);
      return true;
    }
  });
}
