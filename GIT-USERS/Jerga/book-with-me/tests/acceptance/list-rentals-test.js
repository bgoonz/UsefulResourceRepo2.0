import { test } from "qunit";
import moduleForAcceptance from "book-with-me/tests/helpers/module-for-acceptance";
import Service from "@ember/service";

const StubMapsService = Service.extend({
  getMapElement() {
    return document.createElement("div");
  },
});

moduleForAcceptance("Acceptance | list rentals", {
  beforeEach() {
    server.createList("rental", 10);
  },
});

test("visiting / should redirect", function (assert) {
  visit("/");
  andThen(function () {
    assert.equal(currentURL(), "/rentals");
  });
});

test("should list available rentals.", function (assert) {
  visit("/");
  andThen(function () {
    const isLoadedCard = find(".bwm-card").length === 10 ? true : false;
    assert.equal(isLoadedCard, true, "should see rental cards");
  });
});

test("should show single view of rental", function (assert) {
  this.application.register("service:mapsMock", StubMapsService);
  this.application.inject("component", "maps", "service:mapsMock");

  visit("/rentals/1");
  andThen(function () {
    assert.equal(
      find(".container").length > 0,
      true,
      "should see rental cards"
    );
  });
});
