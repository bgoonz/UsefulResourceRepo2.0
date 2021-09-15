import DS from "ember-data";

export default DS.Model.extend({
  start_at: DS.attr(),
  end_at: DS.attr(),
  total_price: DS.attr(),
  days: DS.attr(),
  guests: DS.attr(),
  created_at: DS.attr(),
  user: DS.belongsTo("user"),
  rental: DS.belongsTo("rental"),
});
