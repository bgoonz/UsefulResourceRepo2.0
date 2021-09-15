import Component from "@ember/component";
const { service } = Ember.inject;

export default Component.extend({
  orderedRentals: [],
  utils: service("booking-utils"),

  init() {
    this._super(...arguments);
    this.orderResults();
  },

  didReceiveAttrs() {
    this.orderResults();
  },

  orderResults() {
    this.set(
      "orderedRentals",
      this.get("utils").orderResults(this.get("rentals"))
    );
  },
});
