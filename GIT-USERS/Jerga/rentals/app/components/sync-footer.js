import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    const $lastDiv = $("#bookingSync");
    const $footer = $(".footer");
    $lastDiv.after($footer);
    $footer.removeClass("hidden");
  },
});
