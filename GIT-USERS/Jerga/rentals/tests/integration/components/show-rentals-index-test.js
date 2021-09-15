import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "show-rentals-index",
  "Integration | Component | show rentals index",
  {
    integration: true,
  }
);

test("it renders", function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{show-rentals-index}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#show-rentals-index}}
      template block text
    {{/show-rentals-index}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
