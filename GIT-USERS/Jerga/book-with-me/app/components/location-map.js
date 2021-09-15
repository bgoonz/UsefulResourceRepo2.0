import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  maps: service(),

  init() {
    this._super(...arguments);
  },

  didInsertElement() {
    let address = this.get("city") + "," + this.get("street");
    let mapElement = this.get("maps").getMapElement(address);
    this.$("#map").parent(".ember-view").css({ height: "100%" });
    this.$("#map").replaceWith(mapElement);
  },
});
