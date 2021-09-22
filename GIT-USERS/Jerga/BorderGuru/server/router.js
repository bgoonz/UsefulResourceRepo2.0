const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const Goods = require("./models/goods");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  //AUTH FOR FUTURE USE

  app.get("/secret", requireAuth, function (req, res) {
    res.render("../client/landing.html");
  });

  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);

  //OFFERS ROUTES

  app.get("/offers", function (req, res) {
    Goods.find({}, function (err, allGoods) {
      if (err) {
        console.log("Error!");
        console.log(err);
      } else {
        res.send(allGoods);
      }
    });
  });

  app.delete("/:id", function (req, res) {
    Goods.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        Goods.find({}, function (err, allGoods) {
          if (err) {
            console.log("Error!");
            console.log(err);
          } else {
            res.send(allGoods);
          }
        });
      }
    });
  });

  app.post("/add", function (req, res) {
    const offer = req.body;

    Goods.create(offer, function (err, newOffer) {
      if (err) {
        throw err;
      } else {
        res.send(newOffer);
      }
    });
  });
};
