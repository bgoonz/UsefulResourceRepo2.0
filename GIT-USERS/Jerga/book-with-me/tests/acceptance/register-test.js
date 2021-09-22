import { test } from "qunit";
import moduleForAcceptance from "book-with-me/tests/helpers/module-for-acceptance";
import { later } from "@ember/runloop";
import $ from "jquery";

moduleForAcceptance("Acceptance | register user", {
  beforeEach: function () {
    server.create("user");
  },
});

test("succes submitting form should redirect to login page", async function (assert) {
  var done = assert.async();
  await visit("/register");
  await fillIn(".username > input", "Andrew Bennet");
  await fillIn(".email > input", "benny@gmail.com");
  await fillIn(".password > input", "benny1111");
  await fillIn(".password-confirmation > input", "benny1111");

  $(".btn-bwm").click();
  stop();
  later(() => {
    assert.equal(currentURL(), "/login?r=1");
    done();
  }, 500);
});

test("not equal password submitting form should show error", async function (assert) {
  var done = assert.async();
  await visit("/register");
  await fillIn(".username > input", "Andrew Bennet");
  await fillIn(".email > input", "benny@gmail.com");
  await fillIn(".password > input", "benny1111");
  await fillIn(".password-confirmation > input", "1");

  $(".btn-bwm").click();
  stop();
  later(() => {
    assert.equal(
      find(".alert").text().trim(),
      "Password must be same as confirmation"
    );
    done();
  }, 500);
});

test("same user submitting form should show error", async function (assert) {
  var done = assert.async();
  await visit("/register");
  await fillIn(".username > input", "Test User");
  await fillIn(".email > input", "test@gmail.com");
  await fillIn(".password > input", "testtest");
  await fillIn(".password-confirmation > input", "testtest");

  $(".btn-bwm").click();
  stop();
  later(() => {
    assert.equal(
      find(".alert").text().trim(),
      "User with this email already exists"
    );
    done();
  }, 500);
});
