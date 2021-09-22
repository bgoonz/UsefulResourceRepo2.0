import Service from "@ember/service";
import { camelize } from "@ember/string";
import EmberObject from "@ember/object";

import MapUtil from "../utils/google-maps";

export default Service.extend({
  init() {
    this._super(...arguments);
    if (!this.get("cachedMaps")) {
      this.set("cachedMaps", EmberObject.create());
    }
    if (!this.get("mapUtil")) {
      this.set("mapUtil", MapUtil.create());
    }
  },

  getMapElement(address) {
    let camelizedAddress = camelize(address);
    let element = this.get(`cachedMaps.${camelizedAddress}`);
    if (!element) {
      element = this.createMapElement();
      this.get("mapUtil").createMap(element, address);
      this.set(`cachedMaps.${camelizedAddress}`, element);
    }
    return element;
  },

  createMapElement() {
    let element = document.getElementById("map");
    return element;
  },
});
