define([
  'app/models/food-meeting'
],
function (
  FoodMeeting
) {
  return Backbone.Collection.extend({

    model: FoodMeeting,
    url: '/api/food-meeting'
  });
});