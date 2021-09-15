var middlewareObj = {};

var Comment = require("../models/comment");
var Campground = require("../models/campground");
var User = require("../models/user");

//middleware

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    // passport method to see if user is authenticated
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        req.flash("error", "Campground not found!");
        res.redirect("back");
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You dont have permission to do that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You Need To Be Logged In To Do That!");
    res.redirect("back");
  }
};

middlewareObj.checkUserPermission = function (req, res, next) {
  User.findById(req.user._id, function (err, foundUser) {
    if (err) {
      res.redirect("back");
    } else {
      if (foundUser.role == "ROLE_ADMIN") {
        next();
      } else if (
        foundUser.createdCamps.length > 0 &&
        foundUser.role == "ROLE_USER"
      ) {
        req.flash("error", "You are Allowed to Have just one campground");
        res.redirect("back");
      } else {
        next();
      }
    }
  });
};

middlewareObj.checkCommentsOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    // passport method to see if user is authenticated
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You dont have permission to do that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You Need To Be Logged In To Do That!");
  res.redirect("/login");
};

module.exports = middlewareObj;
