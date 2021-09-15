import Component from "@ember/component";
const { service } = Ember.inject;

export default Component.extend({
  utils: service("booking-utils"),
  orderedBookings: [],

  init() {
    this._super(...arguments);
    this.set(
      "orderedBookings",
      this.get("utils").orderResults(this.get("bookings"))
    );
  },
});
