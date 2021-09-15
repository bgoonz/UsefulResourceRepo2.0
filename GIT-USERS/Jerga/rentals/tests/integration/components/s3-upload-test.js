import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("s3-upload", "Integration | Component | s3 upload", {
  integration: true,
});

test("it renders", function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{s3-upload}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#s3-upload}}
      template block text
    {{/s3-upload}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
