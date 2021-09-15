const { normalizeErrors } = require("../helpers/mongoose");
const Payment = require("../models/payment");
const config = require("../config/index");
const stripe = require("stripe")(config.STRIPE_SECRET_KEY);
const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
exports.getPendingPayment = (req, res) => {
  const user = res.locals.user;

  //  populate booking from payment and populate rental from booking
  Payment.where({ toUser: user })
    .populate({
      path: "booking",
      populate: { path: "rental" },
    })
    .populate("fromUser")
    .exec(async (err, foundPayment) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json(foundPayment);
      // return res.json({ success: 'OK' })
    });
};

exports.confirmPayment = (req, res) => {
  const payment = req.body;

  // const { booking } = payment;

  const user = res.locals.user;

  Payment.findById(payment._id)
    .populate("toUser")
    .populate("booking")
    .exec(async (err, foundPayment) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (
        foundPayment.status === "pending" &&
        user.id === foundPayment.toUser.id
      ) {
        const booking = foundPayment.booking;
        const charge = await stripe.charges.create({
          // strip use cents so we have to * 100
          amount: booking.totalPrice * 100,
          currency: "usd",
          customer: payment.fromStripeCustomerId,
        });

        if (charge) {
          Booking.update(
            {
              _id: booking.id,
            },
            { status: "active" },
            () => {}
          );

          foundPayment.charge = charge;
          foundPayment.status = "paid";

          foundPayment.save((err) => {
            if (err) {
              return res
                .status(422)
                .send({ errors: normalizeErrors(err.errors) });
            }

            User.update(
              { _id: foundPayment.toUser },
              {
                $inc: { revenue: foundPayment.amount },
              },
              (err, user) => {
                if (err) {
                  return res
                    .status(422)
                    .send({ errors: normalizeErrors(err.errors) });
                }

                return res.json({ status: "paid" });
              }
            );
          });
        }
      }
    });
};

exports.declinePayment = (req, res) => {
  const payment = req.body;
  const { booking } = payment;

  Booking.deleteOne({ id: booking._id }, (err, deletedBooking) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    Payment.update({ _id: payment._id }, { status: "declined" }, () => {});
    Rental.update(
      { _id: booking.rental },
      { $pull: { bookings: booking._id } },
      () => {}
    );

    return res.json({ status: "deleted" });
  });
};
