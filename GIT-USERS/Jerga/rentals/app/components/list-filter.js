import Component from "@ember/component";
const { service } = Ember.inject;

export default Component.extend({
  classNames: ["list-filter"],
  value: "",
  utils: service("booking-utils"),

  actions: {
    handleFilterEntry() {
      let filterInputValue = this.get("value");
      let filterAction = this.get("filter");
      filterAction(filterInputValue);
    },
  },
});
