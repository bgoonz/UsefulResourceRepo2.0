import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "rental-details",
  "Integration | Component | rental details",
  {
    integration: true,
  }
);

test("it renders", function (assert) {
  const rental = {
    title: "test title",
    city: "test city",
    street: "test street",
    category: "test category",
    shared: true,
    image: "test",
    bedrooms: 2,
    description: "test description",
    daily_rate: 11,
    created_at: "27/12/1990",
  };

  this.set("rental", rental);

  this.render(hbs`
    {{#rental-details rental=rental}}
    {{/rental-details}}
  `);

  assert.equal(this.$(".rental-title").text(), "test title");
  assert.equal(this.$(".rental-city").text(), "test city");
  assert.equal(this.$(".rental-description").text(), "test description");
});
