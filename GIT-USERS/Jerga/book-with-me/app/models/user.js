import DS from "ember-data";

export default DS.Model.extend({
  username: DS.attr(),
  email: DS.attr(),
  password: DS.attr(),
  password_confirmation: DS.attr(),
  rentals: DS.hasMany("rental"),
  bookings: DS.hasMany("booking"),
});
