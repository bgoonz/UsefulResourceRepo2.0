import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    showRentalDetails(rentalId) {
      this.transitionToRoute("rentals.show", rentalId, {
        queryParams: { isNewRental: "true" },
      });
    },
  },
});
