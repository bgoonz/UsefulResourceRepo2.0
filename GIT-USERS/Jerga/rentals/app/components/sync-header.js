import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  session: Ember.inject.service("session"),
  userService: Ember.inject.service("user"),

  actions: {
    invalidateSession() {
      this.get("session").invalidate();
    },
  },
});
