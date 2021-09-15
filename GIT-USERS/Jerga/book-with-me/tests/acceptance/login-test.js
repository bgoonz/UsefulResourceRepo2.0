import { test } from "qunit";
import moduleForAcceptance from "book-with-me/tests/helpers/module-for-acceptance";
import { later } from "@ember/runloop";
import $ from "jquery";

moduleForAcceptance("Acceptance | login user", {
  beforeEach: function () {
    visit("/login");
  },
});

test("succes submitting form should redirect to rentals", async function (assert) {
  const done = assert.async();
  server.create("rental", { city: "New York" });
  const { username, email, password } = server.create("user").attrs;

  server.schema.users.create({
    username,
    email,
    password,
  });

  await fillIn(".email > input", "test@gmail.com");
  await fillIn(".password > input", "testtest");

  $(".btn-bwm").click();

  stop();
  later(() => {
    assert.equal(currentURL(), "/rentals");
    done();
  }, 500);
});

test("not equal password submitting form should show error", async function (assert) {
  const done = assert.async();

  await fillIn(".email > input", "test@gmail.com");
  await fillIn(".password > input", "asdadadaadasda");

  $(".btn-bwm").click();

  stop();
  later(() => {
    assert.equal(find(".alert").text().trim(), "Wrong email or password");
    done();
  }, 500);
});
