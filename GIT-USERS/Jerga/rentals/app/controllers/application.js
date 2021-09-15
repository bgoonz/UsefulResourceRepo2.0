import Controller from "@ember/controller";
import Ember from "ember";

export default Controller.extend({
  session: Ember.inject.service("session"),

  actions: {
    invalidateSession() {
      this.get("session").invalidate();
    },
  },
});
