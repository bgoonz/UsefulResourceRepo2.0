import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("sync-header", "Integration | Component | sync header", {
  integration: true,
});

test("it renders", function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sync-header}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#sync-header}}
      template block text
    {{/sync-header}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
