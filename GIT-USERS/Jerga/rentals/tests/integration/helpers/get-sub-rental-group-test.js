import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("get-sub-rental-group", "helper:get-sub-rental-group", {
  integration: true,
});

// Replace this with your real tests.
test("it renders", function (assert) {
  this.set("inputValue", "1234");

  this.render(hbs`{{get-sub-rental-group inputValue}}`);

  assert.equal(this.$().text().trim(), "1234");
});
