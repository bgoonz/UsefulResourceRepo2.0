const express = require("express");
const router = express.Router();

const UserCtrl = require("../controller/user-controller");
const ReviewCtrl = require("../controller/review-controller");

router.get("", ReviewCtrl.getReviews);
router.get("/:id/rating", ReviewCtrl.getRentalRating);
router.post("", UserCtrl.authMiddleware, ReviewCtrl.createReview);

module.exports = router;
