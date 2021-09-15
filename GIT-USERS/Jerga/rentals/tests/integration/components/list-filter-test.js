import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import RSVP from "rsvp";
import wait from "ember-test-helpers/wait";

const ITEMS = [
  { city: "San Francisco" },
  { city: "Portland" },
  { city: "Seattle" },
];
const FILTERED_ITEMS = [{ city: "San Francisco" }];

moduleForComponent("list-filter", "Integration | Component | list filter", {
  integration: true,
});

test("should initially load all listings", function (assert) {
  this.on("filterByCity", () => {
    return RSVP.resolve({ results: ITEMS });
  });

  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="city">
          {{item.city}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
  `);

  return wait().then(() => {
    assert.equal(this.$(".city").length, 3);
    assert.equal(this.$(".city").first().text().trim(), "San Francisco");
  });
});

test("should update with matching listings", function (assert) {
  this.on("filterByCity", (val) => {
    if (val === "") {
      return RSVP.resolve({
        query: val,
        results: ITEMS,
      });
    } else {
      return RSVP.resolve({
        query: val,
        results: FILTERED_ITEMS,
      });
    }
  });

  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="city">
          {{item.city}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // The keyup event here should invoke an action that will cause the list to be filtered
  this.$(".list-filter input").val("San").keyup();

  return wait().then(() => {
    assert.equal(this.$(".city").length, 1);
    assert.equal(this.$(".city").text().trim(), "San Francisco");
  });
});
