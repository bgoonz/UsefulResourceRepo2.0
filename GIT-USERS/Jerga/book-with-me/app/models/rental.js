import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr(),
  city: DS.attr(),
  street: DS.attr(),
  category: DS.attr(),
  shared: DS.attr(),
  image: DS.attr(),
  bedrooms: DS.attr(),
  description: DS.attr(),
  daily_rate: DS.attr(),
  created_at: DS.attr(),
  user: DS.belongsTo("user", { async: true }),
  bookings: DS.hasMany("booking"),
});
