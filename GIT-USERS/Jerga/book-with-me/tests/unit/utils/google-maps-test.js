import googleMaps from "book-with-me/utils/google-maps";
import { module, test } from "qunit";

module("Unit | Utility | google maps");

test("it works", function (assert) {
  let result = new googleMaps();
  assert.ok(result);
});
