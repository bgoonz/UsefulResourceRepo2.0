import Component from "@ember/component";
const { service } = Ember.inject;

export default Component.extend({
  userService: service("user"),
  isWide: false,
  itemsPerRow: 3,
  currentUser: null,

  init() {
    this._super(...arguments);
    this.currentUser = this.get("userService").user;
  },

  actions: {
    toggleImageSize() {
      this.toggleProperty("isWide");
    },
  },
});
