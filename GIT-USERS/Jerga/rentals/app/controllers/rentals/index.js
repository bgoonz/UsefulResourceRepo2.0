import RentalsController from "../rentals";

export default RentalsController.extend({
  queryParams: ["page", "perPage", "city"],

  actions: {
    pageClicked(page) {
      this.setProperties({ page: page });
    },

    search(city) {
      this.setProperties({ city: city });
    },
  },
});
