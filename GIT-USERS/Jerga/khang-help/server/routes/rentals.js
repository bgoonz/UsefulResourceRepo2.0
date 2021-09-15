const express = require("express");
const router = express.Router();
const RentalController = require("../controller/rentals-controller");
const UserController = require("../controller/user-controller");

router.get(
  "/secret",
  UserController.authMiddleware,
  RentalController.getSecret
);
// manage should be 1st here because if it put under /id it will be cached
router.get(
  "/manage",
  UserController.authMiddleware,
  RentalController.getManage
);
router.get(
  "/:id/verify-user",
  UserController.authMiddleware,
  RentalController.verifyUser
);
router.get("", RentalController.get);
router.get("/:id", RentalController.getId);
router.patch("/:id", UserController.authMiddleware, RentalController.edit);
router.delete("/:id", UserController.authMiddleware, RentalController.delete);
router.post("", UserController.authMiddleware, RentalController.post);

module.exports = router;
