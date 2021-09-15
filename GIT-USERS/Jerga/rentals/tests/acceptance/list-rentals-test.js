import { test } from "qunit";
import moduleForAcceptance from "super-rentals/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | list rentals");

test("should show rentals as the home page", function (assert) {
  visit("/");
  andThen(function () {
    assert.equal(currentURL(), "/rentals", "should redirect automaticaly");
  });
});

test("should link to information about the company.", function (assert) {
  visit("/");
  click('a:contains("About")');
  andThen(function () {
    assert.equal(currentURL(), "/about", "should redirect to about");
  });
});

test("should link to contact information.", function (assert) {
  visit("/");
  click('a:contains("Contact")');
  andThen(function () {
    assert.equal(currentURL(), "/contact", "should redirect to contact");
  });
});

test("should list available rentals.", function (assert) {
  visit("/");
  andThen(function () {
    assert.equal(find(".listing").length, 3, "should see 3 listings");
  });
});

test("should filter the list of rentals by city.", function (assert) {
  visit("/");
  fillIn(".list-filter input", "Seattle");
  keyEvent(".list-filter input", "keyup", 69);
  andThen(function () {
    assert.equal(find(".listing").length, 1, "should show 1 listing");
    assert.equal(
      find('.listing .location:contains("Seattle")').length,
      1,
      "should contain 1 listing with location Seattle"
    );
  });
});

test("should show details for a selected rental", function (assert) {});
