import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  session: service("session"),

  beforeModel() {
    if (!this.get("session.isAuthenticated")) {
      this.replaceWith("login");
    }
  },
});
