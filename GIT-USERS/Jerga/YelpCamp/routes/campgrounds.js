var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var User = require("../models/user");
var middleware = require("../middleware"); // if its index.js its looked automaticaly

//INDEX ROUTE - Show all camp grounds
router.get("/", function (req, res) {
  //Get all campground from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log("Error!");
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds }); //, currentUser: req.user} // we can send it to template //req.user comming from passport
    }
  });
});

//CREATE ROUTE - INSERT INTO DB
router.post(
  "/",
  middleware.isLoggedIn,
  middleware.checkUserPermission,
  function (req, res) {
    User.findById(req.user._id)
      .populate("rankedCamps")
      .exec(function (err, foundUser) {
        if (err) {
          console.log(err);
        }

        var name = req.body.name;
        var image = req.body.image;
        var description = req.body.description;
        var price = req.body.price;
        var date = new Date().toLocaleDateString("en-EU");

        var author = {
          id: req.user._id, // we can use user thanks to passport and get user when we are logged in
          username: req.user.username,
        };
        var newCampground = {
          name: name,
          image: image,
          description: description,
          date: date,
          price: price,
          author: author,
        };

        Campground.create(newCampground, function (err, newlyCreated) {
          if (err) {
            console.log(err);
          } else {
            foundUser.createdCamps.push(newlyCreated);
            foundUser.save();
            res.redirect("/campgrounds");
          }
        });
      });
  }
);

//NEW ROUTE - SHOW A FORM
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

//SHOW ROUTE - Shows more info about one campground
router.get("/:id", function (req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

//EDIT
router.get(
  "/:id/edit",
  middleware.checkCampgroundOwnership,
  function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      res.render("campgrounds/edit", { campground: foundCampground });
    });
  }
);

//Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    function (err, editedCampground) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  );
});

router.get("/:id", function (req, res) {});

//Destroy canpground route
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//ranking

router.post("/:id/rank", middleware.isLoggedIn, function (req, res) {
  var finalCampground;

  User.findById(req.user._id)
    .populate("rankedCamps")
    .exec(function (err, foundUser) {
      if (err) {
        console.log(err);
      }

      Campground.findById(req.params.id, function (err, foundCampground) {
        for (var i = 0; i < foundUser.rankedCamps.length; i++) {
          if (foundCampground._id.equals(foundUser.rankedCamps[i]._id)) {
            req.flash("error", "You already ranked this camp!");
            res.redirect("/campgrounds/" + req.params.id);
            return;
          }
        }
        var currentRanking = 0;

        foundUser.rankedCamps.push(foundCampground);
        foundUser.save();

        foundCampground.nRank.push(req.body.rank);

        for (var i = 0; i < foundCampground.nRank.length; i++) {
          currentRanking = currentRanking + foundCampground.nRank[i];
        }

        foundCampground.rank = currentRanking / foundCampground.nRank.length;

        foundCampground.save();

        res.redirect("/campgrounds/" + req.params.id);
      });
    });
});

module.exports = router;
