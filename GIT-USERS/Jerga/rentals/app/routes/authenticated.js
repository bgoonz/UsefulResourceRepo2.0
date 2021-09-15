import Route from "@ember/routing/route";

export default Route.extend({
  session: Ember.inject.service("session"),

  beforeModel() {
    if (!this.get("session.isAuthenticated")) {
      this.replaceWith("login");
    }
  },
});
