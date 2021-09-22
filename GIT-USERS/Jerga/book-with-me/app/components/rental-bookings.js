import Component from "@ember/component";

export default Component.extend({
  isShowingModal: false,

  actions: {
    toggleModal: function () {
      this.toggleProperty("isShowingModal");
    },
  },
});
