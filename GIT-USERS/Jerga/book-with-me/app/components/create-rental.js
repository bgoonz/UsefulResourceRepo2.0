import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  store: service(),
  userService: service("user"),

  init() {
    this._super(...arguments);
    this.rental = {};
    this.rental["shared"] = false;
    this.rental["user"] = this.get("userService").getUser();
    this.communityPropertyTypes = ["apartment", "house", "condo"];
  },

  actions: {
    uploadImage() {
      this.set(
        "rental.image",
        "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg"
      );
    },
    submit() {
      const rentalRecord = this.get("store").createRecord(
        "rental",
        this.get("rental")
      );

      rentalRecord
        .save()
        .then((rental) => {
          this.get("router").transitionTo("rentals.show", rental.get("id"));
        })
        .catch((reason) => {
          this.get("store").deleteRecord(rentalRecord);
          this.set("errorMessages", reason.errors || reason);
        });
    },
  },
});
