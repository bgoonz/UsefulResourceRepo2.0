var express = require("express");
var router = express.Router({ mergeParams: true }); //merge params from capmground here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

//Comments create
router.post("/", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          req.flash("error", "Something went wrong!");
          console.log(err);
        } else {
          //add username and id to comment and save comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Successfuly added comment!");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// UPDATE COMMENT
router.get(
  "/:comment_id/edit",
  middleware.checkCommentsOwnership,
  function (req, res) {
    var campground_id = req.params.id;
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        res.render("comments/edit", {
          campground_id: campground_id,
          comment: foundComment,
        });
      }
    });
  }
);

router.put(
  "/:comment_id",
  middleware.checkCommentsOwnership,
  function (req, res) {
    Comment.findByIdAndUpdate(
      req.params.comment_id,
      req.body.comment,
      function (err, updatedComment) {
        if (err) {
          res.redirect("back");
        } else {
          res.redirect("/campgrounds/" + req.params.id);
        }
      }
    );
  }
);

//DESTROY COMMENT

router.delete(
  "/:comment_id",
  middleware.checkCommentsOwnership,
  function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
      if (err) {
        res.redirect("back");
      } else {
        req.flash("success", "Comment Deleted");
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
  }
);

module.exports = router;
