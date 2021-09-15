import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr(),
  owner: DS.attr(),
  city: DS.attr(),
  category: DS.attr(),
  image: DS.attr(),
  bedrooms: DS.attr(),
  description: DS.attr(),
  daily_rate: DS.attr(),
  created_at: DS.attr(),
  user: DS.belongsTo("user", { async: true }),
  bookings: DS.hasMany("booking"),
});
