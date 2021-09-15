import Component from "@ember/component";
const { service } = Ember.inject;

export default Component.extend({
  orderedRentals: [],
  utils: service("booking-utils"),
  isShowingModal: false,

  init() {
    this._super(...arguments);
    this.set(
      "orderedRentals",
      this.get("utils").orderResults(this.get("rentals"))
    );
  },

  actions: {
    toggleModal: function (event) {
      $(event.target).next().toggle();
      this.toggleProperty("isShowingModal");
    },
  },
});
