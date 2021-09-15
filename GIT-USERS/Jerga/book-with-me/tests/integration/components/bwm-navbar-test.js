import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("bwm-navbar", "Integration | Component | bwm navbar", {
  integration: true,
});

test("it renders", function (assert) {
  this.render(hbs`{{bwm-navbar}}`);
  assert.equal(this.$(".navbar-brand").text().trim(), "BookwithMe");
});
