import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("rental-type", "helper:rental-type", {
  integration: true,
});

// Replace this with your real tests.
test("it renders with shared value", function (assert) {
  this.set("inputValue", true);

  this.render(hbs`{{rental-type inputValue}}`);

  assert.equal(this.$().text().trim(), "shared");
});

// Replace this with your real tests.
test("it renders with shared value", function (assert) {
  this.set("inputValue", false);

  this.render(hbs`{{rental-type inputValue}}`);

  assert.equal(this.$().text().trim(), "whole");
});
