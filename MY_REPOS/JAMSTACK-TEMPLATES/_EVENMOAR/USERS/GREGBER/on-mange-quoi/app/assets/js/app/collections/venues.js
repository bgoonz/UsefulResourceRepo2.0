define([
  'app/models/venue'
],
function (
  Venue
) {
  return Backbone.Collection.extend({
    model: Venue,
    url: '/api/venue'
  });
});