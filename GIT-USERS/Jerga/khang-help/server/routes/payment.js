const express = require("express");
const router = express.Router();
const UserController = require("../controller/user-controller");

const PaymentController = require("../controller/payment-controller");

router.get(
  "",
  UserController.authMiddleware,
  PaymentController.getPendingPayment
);

router.post(
  "/accept",
  UserController.authMiddleware,
  PaymentController.confirmPayment
);
router.post(
  "/decline",
  UserController.authMiddleware,
  PaymentController.declinePayment
);
module.exports = router;
