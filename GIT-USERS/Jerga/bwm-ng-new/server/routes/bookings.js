const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getUserBookings,
  getReceivedBookings,
  deleteBooking,
} = require("../controllers/bookings");
const { isUserRentalOwner } = require("../controllers/rentals");
const { onlyAuthUser } = require("../controllers/users");

// /api/v1/bookings?rental="8772392sad79das8d"
router.get("", getBookings);
router.get("/received", onlyAuthUser, getReceivedBookings);
router.get("/me", onlyAuthUser, getUserBookings);
router.post("", onlyAuthUser, isUserRentalOwner, createBooking);

// DELETE: /api/v1/bookings/sad8797da98d79ds

router.delete("/:bookingId", onlyAuthUser, deleteBooking);

module.exports = router;
