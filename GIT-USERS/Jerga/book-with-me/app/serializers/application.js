import DS from "ember-data";
import { underscore } from "@ember/string";

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function (attr) {
    return underscore(attr);
  },
  keyForRelationship: function (key) {
    return underscore(key);
  },
});
