import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  session: service("session"),

  init() {
    this._super(...arguments);
    const registered = this.get(
      "router.currentState.routerJsState.fullQueryParams.r"
    );
    this.isLoading = false;
    this.set("registered", registered);
    this.set("user", {});
  },

  actions: {
    submit(user) {
      this.set("isLoading", true);
      this.get("session")
        .authenticate("authenticator:devise", user.email, user.password)
        .then(() => {
          this.get("router").transitionTo("rentals");
          this.set("isLoading", false);
        })
        .catch((reason) => {
          this.set("isLoading", false);
          this.set(
            "errorMessages",
            reason.errors || reason.responseJSON.errors
          );
        });
    },
  },
});
