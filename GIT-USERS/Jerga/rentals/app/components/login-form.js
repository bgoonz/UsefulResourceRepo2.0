import Component from "@ember/component";
const { service } = Ember.inject;

export default Component.extend({
  session: service("session"),
  userService: service("user"),
  isLoading: false,

  actions: {
    authenticate() {
      this.set("isLoading", true);
      let { identification, password } = this.getProperties(
        "identification",
        "password"
      );
      this.get("session")
        .authenticate("authenticator:devise", identification, password)
        .then(() => this.set("isLoading", false))
        .catch((reason) => {
          this.set("isLoading", false);
          this.set("errorMessage", reason.errors || reason);
        });
    },
  },
});
