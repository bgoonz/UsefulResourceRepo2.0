import Component from "@ember/component";
import { run } from "@ember/runloop";
import $ from "jquery";

export default Component.extend({
  init() {
    this._super(...arguments);
    this.set("user", {});
  },

  actions: {
    submit() {
      run(() => {
        $.ajax({
          url: "/api/v1/users",
          type: "POST",
          data: JSON.stringify({
            user: {
              username: this.get("user.username"),
              email: this.get("user.email"),
              password: this.get("user.password"),
              password_confirmation: this.get("user.password_confirmation"),
            },
          }),
        })
          .then(() => {
            this.get("router").transitionTo("login", {
              queryParams: { r: "1" },
            });
          })
          .catch((reason) => {
            this.set(
              "errorMessages",
              reason.errors || reason.responseJSON.errors
            );
          });
      });
    },
  },
});
