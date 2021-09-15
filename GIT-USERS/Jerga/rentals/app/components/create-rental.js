import Component from "@ember/component";
const { service } = Ember.inject;
import { task } from "ember-concurrency";

const { get, set } = Ember;

export default Component.extend({
  session: service("session"),
  store: Ember.inject.service(),
  selectedOption: null,
  imageName: "",
  isLoading: false,

  communityPropertyTypes: ["Condo", "Townhouse", "Apartment"],

  uploadPhoto: task(function* (file, newRental) {
    this.set("imageName", get(file, "name"));
    file.readAsDataURL().then(function (url) {
      newRental.image = url;
    });
  })
    .maxConcurrency(3)
    .enqueue(),

  actions: {
    setSelection: function (selected) {
      this.set("selectedOption", selected);
    },

    uploadImage(newRental, file) {
      get(this, "uploadPhoto").perform(file, newRental);
    },

    createRental: function (newRental) {
      newRental.category = this.selectedOption;

      this.set("isLoading", true);
      const rentalRecord = this.get("store").createRecord("rental", newRental);
      rentalRecord
        .save()
        .then((rental) => {
          this.set("isLoading", false);
          this.attrs.showRentalDetailsAction(rental.get("id"));
        })
        .catch((reason) => {
          this.get("store").deleteRecord(rentalRecord);
          this.set("isLoading", false);
          this.set("errorMessage", reason.errors || reason);
        });
    },
  },
});
