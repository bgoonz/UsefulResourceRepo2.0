import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  session: service("session"),
  userService: service("user"),

  actions: {
    invalidateSession() {
      this.get("session").invalidate();
    },

    search() {
      const city = this.get("searchCity");

      if (!city) {
        this.get("router").transitionTo("rentals");
      } else {
        this.get("router").transitionTo("homes", city);
      }
    },
  },
});
