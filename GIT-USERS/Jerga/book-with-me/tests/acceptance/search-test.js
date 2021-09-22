import { test } from "qunit";
import moduleForAcceptance from "book-with-me/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | search rental", {
  beforeEach: function () {
    server.create("rental", { city: "Bratislava" });
    server.create("rental", { city: "Bratislava" });
  },
});

test("search should find rentals", async function (assert) {
  await visit("/rentals");
  await fillIn(".bwm-search", "Bratislava");
  await click(".btn");
  assert.equal(currentURL(), "/rentals/Bratislava/homes");
  assert.equal(find(".bwm-card").length, 2, "should see 2 rental cards");
});

test("search should not find rentals", async function (assert) {
  await visit("/rentals");
  await fillIn(".bwm-search", "acbasbmd");
  await click(".btn");
  assert.equal(currentURL(), "/rentals/acbasbmd/homes");
  assert.equal(
    find(".page-title").text().trim(),
    "There are no rentals for city acbasbmd"
  );
});
