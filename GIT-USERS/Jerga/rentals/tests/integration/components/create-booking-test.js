import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "create-booking",
  "Integration | Component | create booking",
  {
    integration: true,
  }
);

test("it renders", function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{create-booking}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#create-booking}}
      template block text
    {{/create-booking}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
