import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("show-rentals", "Integration | Component | show rentals", {
  integration: true,
});

test("it renders", function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{show-rentals}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#show-rentals}}
      template block text
    {{/show-rentals}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
