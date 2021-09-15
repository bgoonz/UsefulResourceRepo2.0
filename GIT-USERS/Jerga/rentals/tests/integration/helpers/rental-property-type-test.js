import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("rental-property-type", "helper:rental-property-type", {
  integration: true,
});

// Replace this with your real tests.
test("it renders correctly for standalone rental", function (assert) {
  this.set("inputValue", "Estate");

  this.render(hbs`{{rental-property-type inputValue}}`);

  assert.equal(this.$().text().trim(), "Standalone");
});

test("it renders correctly for a Community rental", function (assert) {
  this.set("inputValue", "Apartment");

  this.render(hbs`{{rental-property-type inputValue}}`);

  assert.equal(this.$().text().trim(), "Community");
});
