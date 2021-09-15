import Controller from "@ember/controller";
import moment from "moment";
import Ember from "ember";

export default Controller.extend({
  isNewRental: null,
  booking: null,
  user: null,
  model: null,

  initBooking() {
    const startDate = moment().format();
    const endDate = moment().add(1, "days").format();
    const user = this.get("store").createRecord("user");
    this.set("booking", this.get("store").createRecord("booking"));
    this.booking.set("user", user);
    this.booking.set("start_at", startDate);
    this.booking.set("end_at", endDate);
    this.booking.set("guests", 1);
  },

  init() {
    this.initBooking();
  },

  actions: {
    reload: function () {
      this.initBooking();
    },
  },
});
