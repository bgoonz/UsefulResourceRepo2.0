import Route from "@ember/routing/route";
import Ember from "ember";

export default Route.extend({
  session: Ember.inject.service("session"),

  beforeModel() {
    if (this.get("session.isAuthenticated")) {
      this.replaceWith("rentals");
    } else {
      this.replaceWith("login");
    }
  },
});
