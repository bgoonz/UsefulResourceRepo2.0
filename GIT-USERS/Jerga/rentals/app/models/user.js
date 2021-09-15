import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr(),
  email: DS.attr(),
  password: DS.attr(),
  password_confirmation: DS.attr(),
  rentals: DS.hasMany("rental", { async: true }),
  bookings: DS.hasMany("bookings"),
});
