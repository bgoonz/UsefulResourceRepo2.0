import Component from "@ember/component";
import Ember from "ember";
import moment from "moment";

export default Component.extend({
  session: Ember.inject.service("session"),
  store: Ember.inject.service(),
  dates: Ember.inject.service("dates"),
  notify: Ember.inject.service("notify"),
  bookingUtils: Ember.inject.service("booking-utils"),
  isShowingModal: false,
  rental: null,
  booking: null,
  user: null,
  price: 0,
  takenDates: [],

  getCurrentUser() {
    this.get("session.store")
      .restore()
      .then(({ authenticated }) => {
        this.set("booking.user.id", authenticated.email);
      });
  },

  getTakenDates() {
    const bookings = this.rental.get("bookings").toArray();
    const rangeOfDates = [];

    if (bookings && bookings.length) {
      bookings.forEach((booking) => {
        const range = this.get("dates").getRangeOfDates(
          booking.get("start_at"),
          booking.get("end_at")
        );
        range.forEach((date) => this.takenDates.push(date));
        this.takenDates.push(booking.get("start_at"));
        this.takenDates.push(booking.get("end_at"));
      });
    }
  },

  reloadBookingDates() {
    this.get("rental")
      .reload()
      .then(() => this.getTakenDates());
    this.attrs.reloadBooking();
  },

  setDate() {
    const datesRange = this.get("dates").getRangeOfDates(
      this.booking.get("start_at"),
      this.booking.get("end_at")
    );
    this.booking.set("days", datesRange.length);
  },

  init() {
    this._super(...arguments);
    this.getTakenDates();
    this.getCurrentUser();
  },

  actions: {
    toggleModal: function () {
      this.toggleProperty("isShowingModal");
      this.setDate();
    },
    confirmBooking: function () {
      this.booking.set("rental", this.rental);
      this.booking.set(
        "total_price",
        this.get("bookingUtils").totalPrice(
          this.booking.get("rental.daily_rate"),
          this.booking.get("days")
        )
      );
      this.booking
        .save()
        .then((booking) => {
          this.reloadBookingDates();
          this.toggleProperty("isShowingModal");
          this.get("notify").success(
            "Booking succesfuly created, you can check details of your booking in Rental managment section"
          );
        })
        .catch((reason) => this.set("errorMessage", reason.errors || reason));
    },
    setDateRange: function (...prop) {
      this.setDate();
    },
    validateDate: function (date) {
      return (
        this.takenDates.includes(date.format("Y-MM-DD")) ||
        date.diff(moment(), "days", true) <= 0
      );
    },
  },
});
