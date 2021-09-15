import Service from "@ember/service";
import { inject as service } from "@ember/service";

export default Service.extend({
  store: service(),

  saveBooking(booking) {
    return this.get("store")
      .createRecord("booking", {
        start_at: booking.start_at,
        end_at: booking.end_at,
        total_price: booking.price,
        days: booking.days,
        guests: booking.guests,
        user: booking.user,
        rental: booking.rental,
      })
      .save();
  },
});
