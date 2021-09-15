const Rental = require("../models/rental");
const { normalizeErrors } = require("../helpers/mongoose");
const User = require("../models/user");
exports.getSecret = (req, res) => {
  res.json({ secret: true });
};

exports.getManage = (req, res) => {
  const user = res.locals.user;

  // key and value is the same so we can just write user here
  Rental.where({ user })
    .populate("bookings")
    .exec((err, foundRentals) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundRentals);
    });
};

// only owner can edit their own rental
exports.verifyUser = (req, res) => {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user.id !== user.id) {
        return res.status(422).send({
          err: [
            {
              title: "Invalid User!",
              detail: "You're not the owner of this rental",
            },
          ],
        });
      }
      return res.json({ status: "verified" });
    });
};

exports.getId = (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec((err, foundRental) => {
      if (err) {
        res.status(422).send({
          err: [{ title: "Rental Error!", detail: "Couldn't find Rental" }],
        });
      }
      return res.json(foundRental);
    });
};

exports.post = (req, res) => {
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

  const rental = new Rental({
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

  Rental.create(rental, (err, newRental) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    User.update({ _id: user.id }, { $push: { rentals: newRental } }, () => {});
    return res.json(newRental);
  });
};

exports.delete = (req, res) => {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user", "_id")
    .populate({
      path: "bookings",
      select: "startAt",
      match: {
        // check only to delete the rental that only book in the FUTURE
        // not the one that ALREADY BOOKED
        startAt: { $gt: new Date() },
      },
    })
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      if (user.id !== foundRental.user.id) {
        res.status(422).send({
          err: [
            {
              title: "Invalid User!",
              detail: "You're not the owner of this rental",
            },
          ],
        });
      }

      if (foundRental.bookings.length > 0) {
        res.status(422).send({
          err: [
            {
              title: "Active Bookings!",
              detail: "Cannot delete rental with active bookings",
            },
          ],
        });
      }

      foundRental.remove((err) => {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json({ status: "deleted" });
      });
    });
};

exports.get = (req, res) => {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};
  // we don't want to get the bookings
  // we don't need bookings in the listing page
  Rental.find(query)
    .select("-bookings")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(err.errors),
        });
      }

      if (city && foundRental.length === 0) {
        return res.status(422).send({
          err: [
            {
              title: "No Rentals Found!",
              detail: `There are no rentals for city ${city}`,
            },
          ],
        });
      }
      return res.json(foundRental);
    });
};

exports.edit = (req, res, next) => {
  const rentalData = req.body;
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(err.errors),
        });
      }
      if (foundRental.user.id !== user.id) {
        res.status(422).send({
          err: [
            {
              title: "Invalid User!",
              detail: "You're not the owner of this rental",
            },
          ],
        });
      }

      foundRental.set(rentalData);
      foundRental.save((err) => {
        if (user.id !== foundRental.user.id) {
          res.status(422).send({
            err: [
              {
                title: "Invalid User!",
                detail: "You're not the owner of this rental",
              },
            ],
          });
        }
        return res.status(200).json(foundRental);
      });
    });
};
