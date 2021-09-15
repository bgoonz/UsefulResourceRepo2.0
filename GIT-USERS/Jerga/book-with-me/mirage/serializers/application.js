import { JSONAPISerializer } from "ember-cli-mirage";
import { underscore } from "@ember/string";

export default JSONAPISerializer.extend({
  keyForAttribute: function (attr) {
    return underscore(attr);
  },
  keyForRelationship: function (key) {
    return underscore(key);
  },
});
