import Component from "@ember/component";
import moment from "moment";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import Object from "@ember/object";

export default Component.extend({
  dates: service("dates"),
  session: service("session"),
  store: service(),
  userService: service("user"),
  notify: service("notify"),
  bookingService: service("booking"),

  takenDates: null,
  booking: null,
  isShowingModal: false,

  daysOfStay: computed("booking.{start_at,end_at}", function () {
    return this.get("dates").getRangeOfDates(
      this.booking.get("start_at"),
      this.booking.get("end_at")
    ).length;
  }),
  totalPrice: computed("daysOfStay", function () {
    return this.get("daysOfStay") * this.get("rental.daily_rate");
  }),

  init() {
    this._super(...arguments);
    this.set("takenDates", []);
    this.countTakenDates();

    this.set("booking", Object.create());
  },

  countTakenDates() {
    const bookings = this.get("rental.bookings");

    if (bookings && bookings.length) {
      bookings.forEach((booking) => {
        const range = this.get("dates").getRangeOfDates(
          booking.get("start_at"),
          booking.get("end_at")
        );
        range.forEach((date) => this.takenDates.push(date));
        this.get("takenDates").pushObject(booking.get("start_at"));
        this.get("takenDates").pushObject(booking.get("end_at"));
      });
    }
  },

  getCurrentUser() {
    const user = this.get("userService").getUser();
    this.set("booking.user", user);

    return user;
  },

  actions: {
    validateDate: function (date) {
      return (
        this.get("takenDates").includes(date.format("Y-MM-DD")) ||
        date.diff(moment(), "days", true) <= 0
      );
    },
    toggleModal: function () {
      if (this.get("daysOfStay") && this.get("booking.guests")) {
        this.set("errorMessages", {});
        this.toggleProperty("isShowingModal");
      } else {
        this.get("notify").alert("Select days of staying and guest", {
          closeAfter: 2000,
        });
      }
    },
    createBooking: function () {
      this.getCurrentUser();
      this.set("booking.rental", this.get("rental"));
      this.set("booking.days", this.get("daysOfStay"));
      this.set("booking.price", this.get("totalPrice"));

      this.get("bookingService")
        .saveBooking(this.get("booking"))
        .then(() => {
          this.set("booking", Object.create());
          this.countTakenDates();
          this.toggleProperty("isShowingModal");
          this.get("notify").success(
            "Your booking has been successfuly placed",
            {
              closeAfter: 3000,
            }
          );
        })
        .catch((reason) => {
          this.set(
            "errorMessages",
            reason.errors || reason.responseJSON.errors
          );
        });
    },
  },
});
