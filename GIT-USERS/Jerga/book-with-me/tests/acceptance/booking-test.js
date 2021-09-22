import { test } from "qunit";
import moduleForAcceptance from "book-with-me/tests/helpers/module-for-acceptance";
import { later } from "@ember/runloop";
import Service from "@ember/service";
import $ from "jquery";
import moment from "moment";

const StubMapsService = Service.extend({
  getMapElement() {
    return document.createElement("div");
  },
});

const StubBookingService = Service.extend({
  saveBooking(booking) {
    if (booking.start_at && booking.end_at) {
      return new Promise((resolve) => {
        resolve(
          server.create("booking", {
            start_at: booking.start_at,
            end_at: booking.end_at,
            userId: booking.user.id,
            rentalId: booking.rental.id,
          })
        );
      });
    }
  },
});

moduleForAcceptance("Acceptance | book rental", {
  beforeEach: function () {
    this.application.register("service:mapsMock", StubMapsService);
    this.application.inject("component", "maps", "service:mapsMock");

    this.application.register("service:bookingMock", StubBookingService);
    this.application.inject(
      "component",
      "bookingService",
      "service:bookingMock"
    );

    server.create("user", { username: "Ted Mosby" });
    const rentalUser = server.create("user", { username: "Rental Creator" });
    const rental = server.create("rental", {
      city: "New York",
      title: "City with bookings 1",
      userId: rentalUser.id,
    });

    this.startDate = moment().add(1, "day").format("Y-MM-DD");
    this.endDate = moment().add(4, "day").format("Y-MM-DD");

    this.proposedStartDate = moment().add(6, "day").format("ll");
    this.proposedEndDate = moment().add(8, "day").format("ll");

    server.create("booking", {
      start_at: this.startDate,
      end_at: this.endDate,
      userId: rentalUser.id,
      rentalId: rental.id,
    });
  },
});

test("should show error if user is not logged in ", async function (assert) {
  const done = assert.async();

  await visit("/login");
  await fillIn(".email > input", "test@gmail.com");
  await fillIn(".password > input", "testtest");
  $(".btn-bwm").click();

  stop();
  later(async () => {
    await $(".bwm-card-link").click();

    later(async () => {
      await fillIn("input.guests", 5);
      await $("input.daterangepicker-input").click();
      await $("input[name='daterangepicker_start']").val(
        this.proposedStartDate
      );
      await $("input[name='daterangepicker_end']").val(this.proposedEndDate);
      await $("input[name='daterangepicker_end']").focus();
      await $("input[name='daterangepicker_start']").focus();

      await $(".applyBtn").click();
      await $(".btn-confirm").click();
      await $(".booking-confirm").click();

      later(async () => {
        assert.equal(server.schema.db.bookings.length, 2);
        done();
      }, 500);
    }, 500);
  }, 500);
});
