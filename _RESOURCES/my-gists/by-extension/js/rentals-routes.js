const express = require("express");
const router = express.Router();
const rentelModel = require("../models/rental");
const userModel = require("../models/user");
const { normalizeErrors } = require("../heplers/mongoose");

const userCtrl = require("../controllers/user");

router.get("/:id", (req, res) => {
  const user = res.locals.user;
  const rentalId = req.params.id;

  rentelModel
    .findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec(function (err, foundRental) {
      if (err || !foundRental) {
        return res.status(422).send({
          errors: [
            { title: "Rental Error!", detail: "Could not find Rental!" },
          ],
        });
      }

      return res.json(foundRental);
    });
});

router.get("/secret", function (req, res) {
  res.json({ secret: true });
});

router.post("", userCtrl.authMiddleware, (req, res) => {
  const {
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate,
  } = req.body;
  const user = res.locals.user;
  const rental = new rentelModel({
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate,
  });
  rental.user = user;

  rentelModel.create(rental, (err, newRental) => {
    if (err) {
      res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    userModel.update(
      { _id: user.id },
      { $push: { rental: newRental } },
      function () {}
    );

    return res.json(newRental);
  });
});

router.get("", (req, res) => {
  const city = req.query.city;

  if (city) {
    rentelModel
      .find({ city: city.toLowerCase() })
      .select("-bookings")
      .exec((err, filterRental) => {
        if (err) {
          res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (filterRental.length === 0) {
          return res.status(422).send({
            errors: [
              {
                title: "Rental Search Error!",
                detail: `There are no rental for this city: ${city}`,
              },
            ],
          });
        }

        return res.json(filterRental);
      });
  } else {
    rentelModel
      .find({})
      .select("-bookings")
      .exec((err, rentals) => {
        if (err) {
          return res.status(422).send({
            errors: [
              {
                title: "Rentals Error",
                detail: "Could find/get any rentals data from the db" + err,
              },
            ],
          });
        }

        if (rentals.length === 0) {
          return res.status(422).send({
            errors: [
              {
                title: "Rentals Error!",
                detail: `There where no rentals found`,
              },
            ],
          });
        }

        return res.json(rentals);
      });
  }
});

router.delete("/:id", userCtrl.authMiddleware, function (req, res) {
  const user = res.locals.user;

  rentelModel
    .findById(req.params.id)
    .populate("user", "_id")
    .populate({
      path: "bookings",
      select: "startAt",
      match: { startAt: { $gt: new Date() } },
    })

    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [
            { title: "Invalid User!", detail: "You are not rental owner!" },
          ],
        });
      }

      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              title: "Active Bookings!",
              detail: "Cannot delete rental with active bookings!",
            },
          ],
        });
      }

      foundRental.remove(function (err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        // userModel.update({_id: foundRental.user.id}, {$pull: {rentals: foundRental._id}}, () => {})

        res.json({ status: "delete" });
      });
    });
});

module.exports = router;
